package com.team_60.Mocco.security.config;

import com.team_60.Mocco.security.handler.CustomAuthenticationEntryPoint;
import com.team_60.Mocco.security.handler.FailureHandler;
import com.team_60.Mocco.security.filter.JwtAuthenticationFilter;
import com.team_60.Mocco.security.filter.JwtTokenProvider;
import com.team_60.Mocco.security.handler.OAuth2SuccessHandler;
import com.team_60.Mocco.security.oauth.PrincipalOauth2UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@Slf4j
public class SecurityConfig {
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate redisTemplate;
    private final PrincipalOauth2UserService principalOauth2UserService;
    private final OAuth2SuccessHandler successHandler;
    private final FailureHandler failureHandler;

    @Bean
    public WebSecurityCustomizer configure() {
        return (web) -> web.ignoring().antMatchers("/api/register/**","/api/study-info/**","/h2/**","/api/test/**",
                "/api/*/list", "/login/oauth2/**","/oauth2/authorization/*","/api/alarm/subscribe");
    }

    @Bean
    public SecurityFilterChain filterChain (HttpSecurity http) throws Exception{
        http.cors().and().csrf().disable();
        http.headers().frameOptions().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .addFilterBefore(new JwtAuthenticationFilter(redisTemplate,jwtTokenProvider),UsernamePasswordAuthenticationFilter.class)
                .oauth2Login()
                .redirectionEndpoint()
                .baseUri("/login/oauth2/code/*")
                .and()
                .userInfoEndpoint()
                .userService(principalOauth2UserService)
                .and()
                .successHandler(successHandler)
                .failureHandler(failureHandler)
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(new CustomAuthenticationEntryPoint());
//                .and()
//                .authorizeRequests()
//                .antMatchers(HttpMethod.GET).permitAll()
//                .antMatchers("/api/alarm/unsubscribe").permitAll()
//                .anyRequest().access("hasRole('ROLE_USER')")

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("HEAD","POST","GET","DELETE","PATCH","OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.addExposedHeader("AccessToken");
        configuration.addExposedHeader("RefreshToken");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}

