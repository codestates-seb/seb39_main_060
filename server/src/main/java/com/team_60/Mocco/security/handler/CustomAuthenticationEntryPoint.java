package com.team_60.Mocco.security.handler;

import com.nimbusds.jose.shaded.json.JSONObject;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        String exception = (String)request.getAttribute("exception");

        if(exception == null) {
            setResponse(response, ExceptionCode.FILTER_UNKNOWN_ERROR);
        }
        //잘못된 타입의 토큰인 경우
        else if(exception.equals(ExceptionCode.BAD_REQUEST_TOKEN.getStatus())) {
            setResponse(response, ExceptionCode.BAD_REQUEST_TOKEN);
        }
        //토큰 만료된 경우
        else if(exception.equals(ExceptionCode.TOKEN_EXPIRED_EXCEPTION.getStatus())) {
            setResponse(response, ExceptionCode.TOKEN_EXPIRED_EXCEPTION);
        }
        else {
            setResponse(response, ExceptionCode.BAD_REQUEST);
        }
    }
    //한글 출력을 위해 getWriter() 사용
    private void setResponse(HttpServletResponse response, ExceptionCode exceptionCode) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        JSONObject responseJson = new JSONObject();
        responseJson.put("status", exceptionCode.getStatus());
        responseJson.put("message", exceptionCode.getMessage());

        response.getWriter().print(responseJson);
    }
}