package com.example.Back.Auth.Config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.Back.Auth.Models.Role;
import com.example.Back.Auth.Repositories.RoleRepository;

@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner initDatabase(RoleRepository roleRepository) {
        return args -> {
            roleRepository.save(new Role(null, "Super Administrateur"));
            roleRepository.save(new Role(null, "Service Stage"));
            roleRepository.save(new Role(null, "Direction stage"));
            roleRepository.save(new Role(null, "Etudiant"));
            System.out.println("Users inserted successfully!");
        };
    }
}
