package com.team_60.Mocco.security.service;

import com.team_60.Mocco.dto.SingleResponseDto;
import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.member.dto.MemberDto;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.entity.MyInfo;
import com.team_60.Mocco.member.mapper.MemberMapper;
import com.team_60.Mocco.member.repository.MemberRepository;
import com.team_60.Mocco.security.dto.SecurityDto;
import com.team_60.Mocco.security.filter.JwtTokenProvider;
import com.team_60.Mocco.security.oauth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import static com.team_60.Mocco.exception.businessLogic.ExceptionCode.*;
import static com.team_60.Mocco.security.filter.JwtConstants.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class SecurityService {
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final MemberMapper mapper;
    private final RedisTemplate redisTemplate;
    private final BCryptPasswordEncoder passwordEncoder;

    public ResponseEntity login(SecurityDto.Login login, HttpServletResponse response) throws IOException {

        Member member = memberRepository.findByEmail(login.getEmail()).orElse(null);
        if(member == null){
            log.info("해당하는 유저가 존재하지 않습니다.");
            throw new BusinessLogicException(USERNAME_NOT_FOUND);
        }
        UsernamePasswordAuthenticationToken authenticationToken = login.toAuthentication();
        try {
            // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        Map<String, Object> tokenInfo = jwtTokenProvider.generateToken(authentication,response);
        redisTemplate.opsForValue()
                .set("RefreshToken:"+authentication.getName(),tokenInfo.get(REFRESH_TOKEN_HEADER), REFRESH_TOKEN_EXP, TimeUnit.MILLISECONDS);

        MemberDto.Response responseDto = mapper.memberToMemberResponseDto(member);

        return new ResponseEntity(new SingleResponseDto<>(responseDto), HttpStatus.OK);
        } catch (BadCredentialsException e){
            throw new BusinessLogicException(ExceptionCode.NOT_CORRECT_PASSWORD);
        }
    }
    public ResponseEntity logout(HttpServletRequest request){
        if(request.getHeader(ACCESS_TOKEN_HEADER) == null || request.getHeader(ACCESS_TOKEN_HEADER).length()<8){
            throw new BusinessLogicException(BAD_TOKEN_REQUEST);
        }
        String accessToken = request.getHeader(ACCESS_TOKEN_HEADER).substring(TOKEN_HEADER_PREFIX.length());
        //1. AccessToken 검증
        if(!jwtTokenProvider.validateToken(accessToken)){
            log.info("잘못된 요청입니다.");
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        //2. AccessToken에서 User email을 가져온다.
        Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);

        //3. Redis에서 해당 User email로 저장된 RefreshToken이 있는지 여부를 확인 후 있을 경우 삭제
        if(redisTemplate.opsForValue().get("RefreshToken:"+authentication.getName()) != null){
            //refreshToken 삭제
            redisTemplate.delete("RefreshToken:"+authentication.getName());
        }
        //4. 해당 accessToken 유효시간 가지고 와서 BlackList로 저장하기
        Long expiration = jwtTokenProvider.getExpiration(accessToken);
        redisTemplate.opsForValue()
                .set(accessToken,"logout",expiration,TimeUnit.MILLISECONDS);
        log.info("로그아웃 완료");
        return new ResponseEntity(HttpStatus.OK);
    }
    public ResponseEntity refresh(HttpServletRequest request, HttpServletResponse response) throws IOException {
        if(request.getHeader(ACCESS_TOKEN_HEADER) == null || request.getHeader(ACCESS_TOKEN_HEADER).length()<8 ||
                request.getHeader(REFRESH_TOKEN_HEADER) == null || request.getHeader(REFRESH_TOKEN_HEADER).length()<8){
            throw new BusinessLogicException(BAD_TOKEN_REQUEST);
        }
        String reqRefreshToken = request.getHeader(REFRESH_TOKEN_HEADER).substring(TOKEN_HEADER_PREFIX.length());
        String reqAccessToken = request.getHeader(ACCESS_TOKEN_HEADER).substring(TOKEN_HEADER_PREFIX.length());
        //1. RefresgToken 검증
        if (!jwtTokenProvider.validateToken(reqRefreshToken)){
            log.info("RefreshToken 정보가 유효하지 않습니다.");
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        //2. AccessToken 에서 member email을 가져옴
        Authentication authentication = jwtTokenProvider.getAuthentication(reqAccessToken);

        //3. Redis에서 member email을 기반으로 저장된 RefreshToken 값을 가져옴
        String refreshToken = (String) redisTemplate.opsForValue().get("RefreshToken:"+authentication.getName());

        // (추가) 로그아웃되어 Redis 에 RefreshToken 이 존재하지 않는 경우 처리
        if(ObjectUtils.isEmpty(refreshToken)) {
            log.info("잘못된 요청입니다.");
            throw new BusinessLogicException(BAD_TOKEN_REQUEST);
        }
        if(!refreshToken.equals(request.getHeader(REFRESH_TOKEN_HEADER))) {
            log.info("Refresh Token 정보가 일치하지 않습니다.");
            throw new BusinessLogicException(BAD_REFRESH_TOKEN);
        }

        //4. 새로운 토큰 생성
        Map<String,Object> tokenInfo = jwtTokenProvider.generateToken(authentication,response);
        //5. RefreshToken Redis 업데이트
        redisTemplate.opsForValue()
                .set("RefreshToken:"+authentication.getName(), tokenInfo.get(REFRESH_TOKEN_HEADER), REFRESH_TOKEN_EXP, TimeUnit.MILLISECONDS);

        log.info("Token 정보가 갱신되었습니다.");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity githubLogin(Member member, HttpServletResponse response) throws IOException {

        HttpStatus httpStatus = HttpStatus.OK;
        Member findMember = memberRepository.findByProviderId(member.getProviderId()).orElse(null);
        if (findMember != null){
            if(!findMember.getGithubNickname().equals(member.getGithubNickname())){
                findMember.setGithubNickname(member.getGithubNickname());
                memberRepository.save(findMember);
            }
        } else {
            httpStatus = HttpStatus.CREATED;
            findMember = createNewMemberByGithubAccount(member);
        }

        createJWT(findMember, response);
        MemberDto.Response responseDto = mapper.memberToMemberResponseDto(findMember);
        return new ResponseEntity(new SingleResponseDto<>(responseDto), httpStatus);
    }

    private void createJWT(Member member, HttpServletResponse response) throws IOException {
        PrincipalDetails principal = new PrincipalDetails(member);
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(principal, principal.getPassword());
        Map<String, Object> tokenInfo = jwtTokenProvider.generateToken(authenticationToken, response);
        redisTemplate.opsForValue()
                .set("RefreshToken:"+authenticationToken.getName(),tokenInfo.get(REFRESH_TOKEN_HEADER), REFRESH_TOKEN_EXP, TimeUnit.MILLISECONDS);
    }

    private Member createNewMemberByGithubAccount(Member member) {
        Member createMember = new Member();

        createMember.getMyInfo().setMember(createMember);
        createMember.setProviderId(member.getProviderId());
        createMember.setProvider(member.getProvider());
        createMember.setGithubNickname(member.getGithubNickname());
        createMember.setEmail("");

        Long randomPassword = (long) (Math.random() * 1000000000);
        createMember.setPassword(passwordEncoder.encode(randomPassword.toString()));

        String nickname = "Github" + (int) ((Math.random() * (9999 - 1000)) + 1000);
        createMember.setNickname(nickname);

        return memberRepository.save(createMember);
    }
}
