package com.example.Back;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Permet à tous les domaines de faire des requêtes
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200")  // Autoriser le domaine Angular
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Méthodes HTTP autorisées
                .allowedHeaders("*")  // Autoriser tous les en-têtes
                .allowCredentials(true);  // Autoriser les cookies si nécessaire
    }
}