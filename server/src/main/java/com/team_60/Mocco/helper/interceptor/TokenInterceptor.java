package com.team_60.Mocco.helper.interceptor;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.helper.auth.AuthenticationService;
import com.team_60.Mocco.security.filter.JwtTokenProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.Arrays;
import java.util.stream.Collectors;
import java.util.List;

import static com.team_60.Mocco.exception.businessLogic.ExceptionCode.*;
import static com.team_60.Mocco.security.filter.JwtConstants.ACCESS_TOKEN_HEADER;
import static com.team_60.Mocco.security.filter.JwtConstants.TOKEN_HEADER_PREFIX;


@Slf4j
public class TokenInterceptor implements HandlerInterceptor {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationService authenticationService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) { //handler는 진입하려는 컨트롤러의 클래스 객체
        log.info("인터셉터 시작");

            if (request.getHeader(ACCESS_TOKEN_HEADER) == null || request.getHeader(ACCESS_TOKEN_HEADER).length() < 8)
                throw new BusinessLogicException(BAD_TOKEN_REQUEST);

            String accessToken = request.getHeader(ACCESS_TOKEN_HEADER)
                    .substring(TOKEN_HEADER_PREFIX.length());
            long tokenMemberId = jwtTokenProvider.getMemberId(accessToken);
            List<String> urIList = Arrays.stream(request.getRequestURI().split("/")).collect(Collectors.toList());
            String studyProgress = "StudyProgressController";
            String alarmController = "AlarmController";

        try {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            String controllerName = handlerMethod.getBean().getClass().getSimpleName();
            if(tokenMemberId == 15){
                if((handlerMethod.hasMethodAnnotation(PostMapping.class) && !controllerName.startsWith(alarmController))
                        || handlerMethod.hasMethodAnnotation(PatchMapping.class)
                        || handlerMethod.hasMethodAnnotation(DeleteMapping.class)){
                    throw new BusinessLogicException(TEST_ACCOUNT);
                }
            }
            if (controllerName.startsWith(studyProgress)) {
                long studyId = Long.parseLong(urIList.get(4));
                if (urIList.size() < 6) {
                    authenticationService.AuthenticationCheckStudyMember(studyId, tokenMemberId);
                }
                return true;
            }

            Arrays.stream(handlerMethod.getMethodParameters()).forEach(n -> {
                String methodName = handlerMethod.getMethod().getName();
                if (handlerMethod.hasMethodAnnotation(IdRequired.class)) {
                    request.setAttribute("memberId", tokenMemberId);
                }
                if (methodName.equals("getComments") || methodName.equals("getProposalsByStudyId")) {
                    return;
                }
                if (n.hasParameterAnnotation(PathVariable.class) && (!methodName.equals("getMember"))) {
                    long id = Long.parseLong(urIList.get(3));
                    if (methodName.equals("approveProposal") || methodName.equals("deniedProposal")) {
                        authenticationService.AuthenticationCheckStudyLeader(id, tokenMemberId);
                    } else if (methodName.equals("getTaskCheck")) {
                        authenticationService.AuthenticationCheckStudyMemberByTaskId(id, tokenMemberId);
                    } else if (methodName.equals("getEvaluationInfo")) {
                        authenticationService.AuthenticationCheckStudyMember(id, tokenMemberId);
                    } else {
                        authenticationService.AuthenticationCheckWithId(n.getParameter().getName(), id, tokenMemberId);
                    }
                }
            });
            return true;
        } catch (ClassCastException e) {
            throw new BusinessLogicException(BAD_TOKEN_REQUEST);
        } catch (TokenExpiredException e) {
            throw new BusinessLogicException(TOKEN_EXPIRED_EXCEPTION);
        } catch (IllegalArgumentException e) {
            throw new BusinessLogicException(NOT_CORRECT_ARGUMENT);
        } catch (BusinessLogicException e){
            throw new BusinessLogicException(e.getExceptionCode());
        }
    }
}
