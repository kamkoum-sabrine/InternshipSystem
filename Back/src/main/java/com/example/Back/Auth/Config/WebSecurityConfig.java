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
                        .requestMatchers("api/attestations/getAttestations").permitAll() // Autoriser l'accès aux fichiers dans /uploads
                        .requestMatchers("/api/users/register").hasRole("SUPER_ADMINISTRATEUR")
                        .requestMatchers("/api/attestations/download/{attestationId}").permitAll()
                        .requestMatchers("/api/users/activate").hasRole("SUPER_ADMINISTRATEUR")
                        .requestMatchers("/api/users/desactivate").hasRole("SUPER_ADMINISTRATEUR")

                        .requestMatchers("/api/users/getAll").hasAnyAuthority("ROLE_SUPER_ADMINISTRATEUR","ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/userId/{id}").hasAnyAuthority("ROLE_SUPER_ADMINISTRATEUR","ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers("/api/users/etudiants").hasAnyAuthority("ROLE_SUPER_ADMINISTRATEUR","ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_COMITE_CHEF_DEPARTEMENT")
                        .requestMatchers( "/api/soutenance/{id}").permitAll()
                        .requestMatchers( "/api/soutenance").permitAll()
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
                        

                        .requestMatchers("/api/users/emailsphonesfax").permitAll()

                        .requestMatchers("/api/users/getAll").hasAnyAuthority("ROLE_SUPER_ADMINISTRATEUR","ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE")
                        .requestMatchers("/api/userId/{id}").hasAnyAuthority("ROLE_SUPER_ADMINISTRATEUR","ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE")
                        .requestMatchers("/api/users/etudiants").hasAnyAuthority("ROLE_SUPER_ADMINISTRATEUR","ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE")
                        .requestMatchers("/api/users/update/{id}").permitAll()


                        .requestMatchers( "/api/soutenance/{id}").permitAll()
                        .requestMatchers( "/api/soutenance").permitAll()
                        //.requestMatchers( "/api/soutenance/{id}").hasAnyAuthority("ROLE_SERVICE_STAGE")
                        //.requestMatchers( "/api/soutenance/{id}").hasAnyAuthority("ROLE_SERVICE_STAGE")
                        .requestMatchers("/api/entreprises").hasAnyAuthority("ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_ETUDIANT")
                        .requestMatchers("/api/entreprises/{id}").hasAnyAuthority("ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_ETUDIANT")
                        .requestMatchers("/api/entreprises/check-existence").hasAnyAuthority("ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_ETUDIANT")

                        //.requestMatchers( "/api/enseignant/{id}").hasAnyAuthority("ROLE_SERVICE_STAGE")
                        // .requestMatchers("/api/enseignant/{id}").hasAnyAuthority("ROLE_SERVICE_STAGE")
                        // .requestMatchers("/api/enseignant/{id}").hasAnyAuthority("ROLE_SERVICE_STAGE")
                        .requestMatchers("/api/enseignant/{id}").hasAnyAuthority("ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE")
                        .requestMatchers("/api/enseignant").hasAnyAuthority("ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE")
                        .requestMatchers("/api/enseignant/emails").hasAnyAuthority("ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE")
                        .requestMatchers("/api/conventionStagEte/create").hasAnyAuthority("ROLE_SERVICE_STAGE", "ROLE_ETUDIANT")

                        .requestMatchers("/api/conventionStagEte/getMyConventions/{id}").hasAnyAuthority("ROLE_ETUDIANT","ROLE_SERVICE_STAGE")
                        .requestMatchers("/api/conventionStagPFE/getMyConventions/{id}").hasAnyAuthority("ROLE_ETUDIANT","ROLE_SERVICE_STAGE")



                        .requestMatchers("/api/pdf/PFE/convention/word/{id}").permitAll()

                        .requestMatchers("/api/pdf/convention/word/{id}").permitAll()

                        .requestMatchers("/api/pdf/convention/{id}").permitAll()

                        .requestMatchers("/api/conventionStagEte/uploadPreuveAnnulation/{conventionId}").hasAnyAuthority( "ROLE_ETUDIANT")
                        .requestMatchers("/api/conventionStagEte/annuler/{conventionId}").hasAnyAuthority( "ROLE_SERVICE_STAGE")
                        .requestMatchers("/api/conventionStagEte/refuserAnnulation/{conventionId}").hasAnyAuthority( "ROLE_SERVICE_STAGE")
                        .requestMatchers("/api/conventionStagEte/ValiderConvention/{id}").hasAnyAuthority( "ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE")
                        .requestMatchers("/api/conventionStagEte/RefuserConvention/{id}").hasAnyAuthority( "ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE")
                        .requestMatchers("/api/conventionStagEte/ConventionsAvecPreuveNonAnnulees").permitAll()
                        .requestMatchers("/api/conventionStagEte/getConventions").hasAnyAuthority( "ROLE_SERVICE_STAGE")
                        .requestMatchers("/api/conventionStagEte/ConventionsAvecPreuveNonAnnulees").hasAnyAuthority( "ROLE_SERVICE_STAGE")
                        .requestMatchers("/api/conventionStagEte/downloadPreuveAnnulation/{conventionId}").hasAnyAuthority( "ROLE_SERVICE_STAGE")
                        .requestMatchers("/api/conventionStagPFE/ValiderConvention/{id}").hasAnyAuthority( "ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE")
                        .requestMatchers("/api/conventionStagPFE/RefuserConvention/{id}").hasAnyAuthority( "ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE")
                        .requestMatchers("/api/conventionStagEte/ValiderConventionDirectionEnicar/{id}").hasAnyAuthority( "ROLE_DIRECTION_ENICAR")
                        .requestMatchers("/api/conventionStagEte/RefuserConventionDirectionEnicar/{id}").hasAnyAuthority( "ROLE_DIRECTION_ENICAR")



                        .requestMatchers("/api/pdf/convention/{id}","/api/users/etudiants/**").hasAnyAuthority("ROLE_ETUDIANT")

                        .requestMatchers("/api/tuteurPFE").hasAnyAuthority("ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_ETUDIANT")
                        .requestMatchers("/api/conventionStagPFE/create").hasAnyAuthority("ROLE_ETUDIANT","ROLE_SERVICE_STAGE")
                        .requestMatchers("/api/tuteurPFE/check-existence").hasAnyAuthority("ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_ETUDIANT")

                        .requestMatchers("/api/conventionStagPFE/uploadPreuveAnnulation/{conventionId}").hasAnyAuthority( "ROLE_ETUDIANT","ROLE_SERVICE_STAGE")
                        .requestMatchers("/api/conventionStagPFE/annuler/{conventionId}").hasAnyAuthority( "ROLE_ETUDIANT","ROLE_SERVICE_STAGE")
                        .requestMatchers("/api/conventionStagPFE/refuserAnnulation/{conventionId}").hasAnyAuthority( "ROLE_ETUDIANT","ROLE_SERVICE_STAGE")
                        .requestMatchers("/api/conventionStagPFE/ValiderConvention/{id}").hasAnyAuthority( "ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE")
                        .requestMatchers("/api/conventionStagPFE/RefuserConvention/{id}").hasAnyAuthority( "ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE")
                        .requestMatchers("/api/conventionStagPFE/ConventionsAvecPreuveNonAnnulees").hasAnyAuthority( "ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE")

                        // Endpoints Livrables
                        .requestMatchers("/uploads/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/livrable/{etudiantId}").hasAnyAuthority("ROLE_ETUDIANT")
                        .requestMatchers(HttpMethod.GET, "/api/livrable").hasAnyAuthority("ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_ETUDIANT")
                        .requestMatchers(HttpMethod.POST, "/api/livrable").hasAnyAuthority("ROLE_ETUDIANT")
                        .requestMatchers(HttpMethod.PUT, "/api/livrable/**").hasAnyAuthority("ROLE_ETUDIANT","ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE")
                        .requestMatchers(HttpMethod.DELETE, "/api/livrable/**").hasAnyAuthority("ROLE_DIRECTION_STAGE","ROLE_ETUDIANT")
                        .requestMatchers(HttpMethod.DELETE, "/api/livrable/**").hasAnyAuthority("ROLE_SERVICE_STAGE","ROLE_ETUDIANT")

                        .requestMatchers("/api/conventionStagPFE/getConventions").permitAll()

                        .requestMatchers("/api/conventionStagPFE/RefuserConventionDirectionEnicar/{id}").hasAnyAuthority( "ROLE_DIRECTION_ENICAR")
                        .requestMatchers("/api/conventionStagPFE/ValiderConventionDirectionEnicar/{id}").hasAnyAuthority( "ROLE_DIRECTION_ENICAR")

                        .requestMatchers("/api/conventionStagPFE/RefuserConventionChefDepartement/{id}").hasAnyAuthority( "ROLE_CHEF_DEPARTEMENT_INFO","ROLE_CHEF_DEPARTEMENT_ELECTRIQUE","ROLE_CHEF_DEPARTEMENT_INDUS" )
                        .requestMatchers("/api/conventionStagPFE/ValiderConventionChefDepartement/{id}").hasAnyAuthority( "ROLE_CHEF_DEPARTEMENT_INFO","ROLE_CHEF_DEPARTEMENT_ELECTRIQUE","ROLE_CHEF_DEPARTEMENT_INDUS")

                        .requestMatchers("/api/conventionStagEte/RefuserConventionChefDepartement/{id}").hasAnyAuthority( "ROLE_CHEF_DEPARTEMENT_INFO","ROLE_CHEF_DEPARTEMENT_ELECTRIQUE","ROLE_CHEF_DEPARTEMENT_INDUS" )
                        .requestMatchers("/api/conventionStagEte/ValiderConventionChefDepartement/{id}").hasAnyAuthority( "ROLE_CHEF_DEPARTEMENT_INFO","ROLE_CHEF_DEPARTEMENT_ELECTRIQUE","ROLE_CHEF_DEPARTEMENT_INDUS")


                        .requestMatchers("/api/conventionStagPFE/RefuserConventionChefDepartement/{id}").hasAnyAuthority( "ROLE_CHEF_DEPARTEMENT_INFO","ROLE_CHEF_DEPARTEMENT_ELECTRIQUE","ROLE_CHEF_DEPARTEMENT_INDUS" )
                        .requestMatchers("/api/conventionStagPFE/ValiderConventionChefDepartement/{id}").hasAnyAuthority( "ROLE_CHEF_DEPARTEMENT_INFO","ROLE_CHEF_DEPARTEMENT_ELECTRIQUE","ROLE_CHEF_DEPARTEMENT_INDUS")
                        .requestMatchers("/api/conventionStagPFE/ValiderConventionComiteChef/{id}").permitAll()
                        .requestMatchers("/api/conventionStagEte/ValiderConventionComiteChef/{id}").permitAll()

                        .requestMatchers("/api/conventionStage/validees-chef-departementETE").hasAnyAuthority( "ROLE_DIRECTION_ENICAR")
                        .requestMatchers("/api/conventionStage/validees-chef-departementPFE").hasAnyAuthority( "ROLE_DIRECTION_ENICAR")


                        .requestMatchers("/api/conventionStagEte/uploads/**").permitAll()//hasAnyAuthority("ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_ETUDIANT")
                        .requestMatchers("/api/conventionStagPFE/uploads/**").permitAll()//hasAnyAuthority("ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_ETUDIANT")
                        .requestMatchers("/api/conventions/lettre-affectation/uploads/**").permitAll()//hasAnyAuthority("ROLE_DIRECTION_STAGE","ROLE_SERVICE_STAGE","ROLE_ETUDIANT")


                        .requestMatchers("/api/conventions/lettre-affectation/generate/{conventionId}").hasAnyAuthority("ROLE_DIRECTION_ENICAR")
                        .requestMatchers("/api/conventions/lettre-affectation/generatePFE/{conventionId}").hasAnyAuthority("ROLE_DIRECTION_ENICAR")

                        .requestMatchers("/api/conventions/lettre-affectation/downloadLettreAffectation/{conventionId}").permitAll()
                        .requestMatchers("/api/statistiques/**").permitAll()
                        .requestMatchers("/api/statistiques/students-distribution").permitAll()
                        .requestMatchers("/api/conventions/stats").permitAll()

                        .requestMatchers(HttpMethod.GET, "/api/deadlines").permitAll()//.hasAnyAuthority("ROLE_DIRECTION_STAGE", "ROLE_SERVICE_STAGE")
                        .requestMatchers(HttpMethod.GET, "/api/deadlines/{id}").permitAll()//.hasAnyAuthority("ROLE_DIRECTION_STAGE", "ROLE_SERVICE_STAGE")
                        .requestMatchers(HttpMethod.POST, "/api/deadlines").permitAll()//.hasAnyAuthority("ROLE_DIRECTION_STAGE")
                        .requestMatchers(HttpMethod.PUT, "/api/deadlines/{id}").permitAll()//.hasAnyAuthority("ROLE_DIRECTION_STAGE")conventionStagPFE/getConventions
                        .requestMatchers(HttpMethod.DELETE, "/api/deadlines/{id}").permitAll()//.hasAnyAuthority("ROLE_DIRECTION_STAGE")
                        .requestMatchers( "/api/livrable/{id}/valider").hasAnyAuthority("ROLE_DIRECTION_STAGE", "ROLE_SERVICE_STAGE")
                        .requestMatchers("/api/livrable/{id}/rejeter").hasAnyAuthority("ROLE_DIRECTION_STAGE", "ROLE_SERVICE_STAGE")
                        .requestMatchers(HttpMethod.GET, "/api/livrable/download/**").permitAll()
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
