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
                        //.requestMatchers( "/api/soutenance/{id}").hasAnyAuthority("ROLE_SERVICE_STAGE")
                        //.requestMatchers( "/api/soutenance/{id}").hasAnyAuthority("ROLE_SERVICE_STAGE")
                        .requestMatchers("/api/entreprises").hasAnyAuthority("ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_ETUDIANT","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/entreprises/{id}").hasAnyAuthority("ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_ETUDIANT","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/entreprises/check-existence").hasAnyAuthority("ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_ETUDIANT","ROLE_COMITE_CHEF_DEPARTEMENT")

                        //.requestMatchers( "/api/enseignant/{id}").hasAnyAuthority("ROLE_SERVICE_STAGE")
                        // .requestMatchers("/api/enseignant/{id}").hasAnyAuthority("ROLE_SERVICE_STAGE")
                        // .requestMatchers("/api/enseignant/{id}").hasAnyAuthority("ROLE_SERVICE_STAGE")
                        .requestMatchers("/api/enseignant/{id}").hasAnyAuthority("ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/enseignant").hasAnyAuthority("ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")

                        .requestMatchers("/api/conventionStagEte/create").hasAnyAuthority("ROLE_SERVICE_STAGE", "ROLE_ETUDIANT","ROLE_COMITE_CHEF_DEPARTEMENT")

                        .requestMatchers("/api/conventionStagEte/getMyConventions/{id}").hasAnyAuthority("ROLE_ETUDIANT","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/conventionStagPFE/getMyConventions/{id}").hasAnyAuthority("ROLE_ETUDIANT","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")



                        .requestMatchers("/api/pdf/convention/{id}").hasAnyAuthority("ROLE_ETUDIANT")
                        .requestMatchers("/api/pdf//convention/word/{id}").hasAnyAuthority("ROLE_ETUDIANT")
                        .requestMatchers("/api/pdf/PFE/convention/word/{id}").hasAnyAuthority("ROLE_ETUDIANT")

                        .requestMatchers("/api/conventionStagEte/uploadPreuveAnnulation/{conventionId}").hasAnyAuthority( "ROLE_ETUDIANT")
                        .requestMatchers("/api/conventionStagEte/annuler/{conventionId}").hasAnyAuthority( "ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/conventionStagEte/refuserAnnulation/{conventionId}").hasAnyAuthority( "ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/conventionStagEte/ValiderConvention/{id}").hasAnyAuthority( "ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/conventionStagEte/RefuserConvention/{id}").hasAnyAuthority( "ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/conventionStagEte/ConventionsAvecPreuveNonAnnulees").hasAnyAuthority( "ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/conventionStagEte/getConventions").hasAnyAuthority( "ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/conventionStagEte/ConventionsAvecPreuveNonAnnulees").hasAnyAuthority( "ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/conventionStagEte/downloadPreuveAnnulation/{conventionId}").hasAnyAuthority( "ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/conventionStagPFE/ValiderConvention/{id}").hasAnyAuthority( "ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/conventionStagPFE/RefuserConvention/{id}").hasAnyAuthority( "ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")

                        .requestMatchers("/api/conventionStagEte/ValiderConventionDirectionEnicar/{id}").hasAnyAuthority( "ROLE_DIRECTION_ENICAR","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/conventionStagEte/RefuserConventionDirectionEnicar/{id}").hasAnyAuthority( "ROLE_DIRECTION_ENICAR","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/conventionStagEte/ValiderConventionComiteChef/{id}").hasAnyAuthority( "ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/conventionStagEte/RefuserConventionComiteChef/{id}").hasAnyAuthority( "ROLE_COMITE_CHEF_DEPARTEMENT")



                        .requestMatchers("/api/pdf/convention/{id}","/api/users/etudiants/**").hasAnyAuthority("ROLE_ETUDIANT")

                        .requestMatchers("/api/tuteurPFE").hasAnyAuthority("ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_ETUDIANT","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/conventionStagPFE/create").hasAnyAuthority("ROLE_ETUDIANT","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/tuteurPFE/check-existence").hasAnyAuthority("ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_ETUDIANT","ROLE_COMITE_CHEF_DEPARTEMENT")

                        .requestMatchers("/api/conventionStagPFE/uploadPreuveAnnulation/{conventionId}").hasAnyAuthority( "ROLE_ETUDIANT","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/conventionStagPFE/annuler/{conventionId}").hasAnyAuthority( "ROLE_ETUDIANT","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/conventionStagPFE/refuserAnnulation/{conventionId}").hasAnyAuthority( "ROLE_ETUDIANT","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/conventionStagPFE/ValiderConvention/{id}").hasAnyAuthority( "ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")

                        .requestMatchers("/api/conventionStagPFE/RefuserConvention/{id}").hasAnyAuthority( "ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/conventionStagPFE/ConventionsAvecPreuveNonAnnulees").hasAnyAuthority( "ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/conventionStagPFE/getConventions").hasAnyAuthority( "ROLE_SERVICE_STAGE","ROLE_DIRECTION_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")

                        .requestMatchers("/api/conventionStagPFE/RefuserConventionDirectionEnicar/{id}").hasAnyAuthority( "ROLE_DIRECTION_ENICAR")
                        .requestMatchers("/api/conventionStagPFE/ValiderConventionDirectionEnicar/{id}").hasAnyAuthority( "ROLE_DIRECTION_ENICAR")


                        .requestMatchers("/api/conventionStage/validees-chef-departementETE").hasAnyAuthority( "ROLE_DIRECTION_ENICAR")
                        .requestMatchers("/api/conventionStage/validees-chef-departementPFE").hasAnyAuthority( "ROLE_DIRECTION_ENICAR")

                        .requestMatchers("/api/conventionStagEte/uploads/**").permitAll()//hasAnyAuthority("ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_ETUDIANT")
                        .requestMatchers("/api/conventionStagPFE/uploads/**").permitAll()//hasAnyAuthority("ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_ETUDIANT")


                                .anyRequest().authenticated())
                /** .requestMatchers("/api/login", "/api/admin/register", "/api/admin/activate",

                 "/api/auth/desactivate","/api/entreprises","/api/auth/users",
                 "/api/auth/etudiants","/api/soutenance","api/enseingnant")


                 .requestMatchers("/api/auth/login", "/api/auth/register", "/api/auth/activate",
                 "/api/auth/desactivate","/api/entreprises/**","/api/auth/users","/api/roles/all","/api/auth/etudiants","/api/soutenance")



                 .permitAll()
                 .requestMatchers(HttpMethod.DELETE, "/api/soutenance/{id}").permitAll()
                 .requestMatchers(HttpMethod.POST, "/api/soutenance").permitAll()
                 .requestMatchers(HttpMethod.GET, "/api/soutenance/{id}").permitAll()
                 .requestMatchers(HttpMethod.PUT, "/api/soutenance/{id}").permitAll()
                 .requestMatchers(HttpMethod.GET, "/api/auth/userId/{id}").permitAll()

                 // publiques**/

                // Routes protégées en fonction des rôles





                // publiques
                // .anyRequest().authenticated())
               .exceptionHandling(exception ->
                       exception.accessDeniedHandler(customAccessDeniedHandler))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); // Ajout du
        // filtre JWT

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