package com.team_60.Mocco.security.filter;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.util.ContentCachingRequestWrapper;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final RedisTemplate redisTemplate;
    private final JwtTokenProvider jwtTokenProvider;
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        log.info("권한 인증 필터 시작");
        HttpServletRequest currentRequest = (HttpServletRequest) request;
        ContentCachingRequestWrapper wrappedRequest = new ContentCachingRequestWrapper(currentRequest);
        //header에서 JWT 토큰 추출
        String token = getToken((HttpServletRequest) request);
      try {
            if (token != null && jwtTokenProvider.validateToken(token)) {
                //redis에 해당 accessToken logout 여부 확인
                String isLogout = (String) redisTemplate.opsForValue().get(token);
                if (ObjectUtils.isEmpty(isLogout)) {
                    //토큰이 유효할 경우 토큰에서 Authentication 객체를 가지고 와서 SecurityContext에 자징
                    Authentication authentication = jwtTokenProvider.getAuthentication(token);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
            }catch (NullPointerException e){
                request.setAttribute("exception", ExceptionCode.BAD_REQUEST_TOKEN.getMessage());
            } catch (TokenExpiredException e) {
                request.setAttribute("exception", ExceptionCode.TOKEN_EXPIRED_EXCEPTION.getMessage());
            } catch (IllegalArgumentException e) {
                request.setAttribute("exception", ExceptionCode.NOT_CORRECT_ARGUMENT.getMessage());
            } catch (SecurityException e) {
            log.error("Exception Message : {}", e.getMessage());
            log.error("Exception StackTrace : {");
            e.printStackTrace();
                request.setAttribute("exception", ExceptionCode.FILTER_UNKNOWN_ERROR.getMessage());
            } catch (BusinessLogicException e){
                request.setAttribute("exception", e.getExceptionCode().getStatus());
        }

        catch (Exception e) {
                log.error("================================================");
                log.error("JwtFilter - doFilterInternal() 오류발생");
                log.error("token : {}", token);
                log.error("Exception Message : {}", e.getMessage());
                log.error("Exception StackTrace : {");
                e.printStackTrace();
                log.error("}");
                log.error("================================================");
               request.setAttribute("exception", e.getMessage());
          }
        //토큰 유효성 검사
        chain.doFilter(wrappedRequest, response);
    }
    private String getToken(HttpServletRequest request){
        String authorizationHeader = request.getHeader(JwtConstants.ACCESS_TOKEN_HEADER);

        if(authorizationHeader != null && authorizationHeader.startsWith(JwtConstants.TOKEN_HEADER_PREFIX)){
            return authorizationHeader.substring(JwtConstants.TOKEN_HEADER_PREFIX.length());
        }
        return null;
    //}
}}
