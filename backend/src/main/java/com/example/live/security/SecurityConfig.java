package com.example.live.config;

import com.example.live.component.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    // Настройка CORS фильтра
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // Разрешаем передачу кук и авторизационных заголовков
        config.setAllowCredentials(true);

        // Указываем точный origin фронтенд-приложения
        config.addAllowedOrigin("http://localhost:3000");

        // Разрешаем все заголовки
        config.addAllowedHeader("*");

        // Разрешаем все HTTP-методы (GET, POST и т.д.)
        config.addAllowedMethod("*");

        // Явно указываем, какие заголовки могут быть доступны клиенту
        config.addExposedHeader("Authorization");
        config.addExposedHeader("Content-Disposition");

        // Применяем настройки CORS ко всем URL
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }

    // Конфигурация цепочки фильтров безопасности
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Отключаем CSRF защиту (не нужна для API с JWT)
                .csrf(AbstractHttpConfigurer::disable)

                // Настройка CORS (используем наш corsFilter)
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration configuration = new CorsConfiguration();
                    configuration.setAllowCredentials(true);
                    configuration.addAllowedOrigin("http://localhost:3000");
                    configuration.addAllowedHeader("*");
                    configuration.addAllowedMethod("*");
                    return configuration;
                }))

                // Настройка авторизации запросов
                .authorizeHttpRequests(auth -> auth
                        // Разрешаем всем доступ к эндпоинтам аутентификации
                        .requestMatchers("/api/auth/**").permitAll()

                        // Настройка доступа по ролям
                        .requestMatchers(HttpMethod.GET, "/api/**").hasAnyRole("USER", "MANAGER", "ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/**").hasAnyRole("MANAGER", "ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/**").hasRole("ADMIN")

                        // Все остальные запросы требуют аутентификации
                        .anyRequest().authenticated()
                )

                // Настройка управления сессией (STATELESS для JWT)
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // Добавляем наш JWT фильтр перед стандартным фильтром аутентификации
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // Бин для кодирования паролей
    @Bean
    public PasswordEncoder passwordEncoder() {
        // Используем BCrypt с силой хеширования 10 (по умолчанию)
        return new BCryptPasswordEncoder();
    }

    // Бин для менеджера аутентификации
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}