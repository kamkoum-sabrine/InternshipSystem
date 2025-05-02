package com.example.Back.Auth.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class WebSecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public WebSecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder);
        return authProvider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, CorsConfigurationSource corsConfigurationSource, CustomAccessDeniedHandler customAccessDeniedHandler) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Activer CORS
                .csrf(csrf -> csrf.disable())  // Désactiver CSRF si nécessaire
                .sessionManagement(management -> management
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(requests -> requests
                        .requestMatchers("api/attestations/uploads/**").permitAll() // Autoriser l'accès aux fichiers dans /uploads
                        .requestMatchers("/api/login").permitAll()
                        .requestMatchers("/api/roles/all").hasRole("SUPER_ADMINISTRATEUR")
                        .requestMatchers("/api/users/register").hasRole("SUPER_ADMINISTRATEUR")
                        .requestMatchers("/api/users/activate").hasRole("SUPER_ADMINISTRATEUR")
                        .requestMatchers("/api/users/desactivate").hasRole("SUPER_ADMINISTRATEUR")
                        .requestMatchers("/api/users/getAll").hasAnyAuthority("ROLE_SUPER_ADMINISTRATEUR","ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/userId/{id}").hasAnyAuthority("ROLE_SUPER_ADMINISTRATEUR","ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/users/etudiants").hasAnyAuthority("ROLE_SUPER_ADMINISTRATEUR","ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers( "/api/soutenance/{id}").hasAnyAuthority("ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers( "/api/soutenance").hasAnyAuthority("ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/entreprises").hasAnyAuthority("ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_ETUDIANT","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/entreprises/{id}").hasAnyAuthority("ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_ETUDIANT","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/entreprises/check-existence").hasAnyAuthority("ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_ETUDIANT","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/enseignant/{id}").hasAnyAuthority("ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/enseignant").hasAnyAuthority("ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/conventionStagEte/create").hasAnyAuthority("ROLE_SERVICE_STAGE", "ROLE_ETUDIANT","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/conventionStagEte/getMyConventions/{id}").hasAnyAuthority("ROLE_ETUDIANT","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/pdf/convention/{id}").hasAnyAuthority("ROLE_ETUDIANT")
                        .requestMatchers("/api/conventionStagEte/ValiderConvention/{id}").hasAnyAuthority( "ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/conventionStagEte/RefuserConvention/{id}").hasAnyAuthority( "ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/conventionStagEte/getConventions").hasAnyAuthority( "ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/conventionStagEte/downloadPreuveAnnulation/{conventionId}").hasAnyAuthority( "ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/conventionStagPFE/ValiderConvention/{id}").hasAnyAuthority( "ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/conventionStagPFE/RefuserConvention/{id}").hasAnyAuthority( "ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/attestations/getMyAttestation/{id}").hasAnyAuthority( "ROLE_ETUDIANT")
                        .requestMatchers("/api/attestations/list").permitAll()
                        .anyRequest().authenticated())
                .exceptionHandling(exception ->
                        exception.accessDeniedHandler(customAccessDeniedHandler))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); // Ajout du filtre JWT

        return http.build();
    }

    @Bean
    public CorsFilter corsFilter() {
        return new CorsFilter(corsConfigurationSource());
    }

    private UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.setAllowedOrigins(List.of("http://localhost:4200")); // Autoriser Angular
        corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        corsConfig.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        corsConfig.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);
        return source;
    }
}
