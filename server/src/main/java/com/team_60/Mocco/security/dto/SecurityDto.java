package com.team_60.Mocco.security.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class SecurityDto {

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Login {
        @Email(message = "이메일 형식을 맞추어야 합니다.")
        @NotBlank(message = "이메일은 빈칸이 아니여야 합니다.")
        private String email;

        private String password;
        public UsernamePasswordAuthenticationToken toAuthentication(){
            return new UsernamePasswordAuthenticationToken(email,password);
        }
    }


}
