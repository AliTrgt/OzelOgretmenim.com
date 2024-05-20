package com.example.SoftwareEngineeringProject.config;


import com.example.SoftwareEngineeringProject.Entity.Role;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static com.example.SoftwareEngineeringProject.Entity.Role.*;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
                .headers(x -> x.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        auth ->
                                auth
                                        .requestMatchers("/").permitAll()
                                        .requestMatchers("/tutor/{tutorId}").hasAnyRole("ADMIN","TUTOR","STUDENT")
                                        .requestMatchers("/student/{studentId}").hasAnyRole("ADMIN","TUTOR","STUDENT")
                                        .requestMatchers("/notice/create").hasAnyRole("TUTOR","ADMIN")
                                        .requestMatchers("/tutor/**").hasAnyRole("ADMIN","TUTOR")
                                        .requestMatchers("/student/**").hasAnyRole("ADMIN","STUDENT")
                                        .requestMatchers("/notice/**").hasAnyRole("TUTOR","ADMIN","STUDENT")
                                        .anyRequest().permitAll()

                )
                .formLogin(AbstractHttpConfigurer::disable) // Giriş sayfasını devre dışı bırak
                .httpBasic(Customizer.withDefaults());
        return http.build();

    }



}
