package com.example.Back.Soutenance.Config;

import com.example.Back.Soutenance.Model.Enseignant;
import com.example.Back.Soutenance.Model.Soutenance;
import com.example.Back.Soutenance.Repository.EnseignantRepository;
import com.example.Back.Soutenance.Repository.SoutenanceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Configuration
public class EnseignantConfig {

    @Bean
    CommandLineRunner commandLineRunner(EnseignantRepository enseignantRepository, SoutenanceRepository soutenanceRepository) {
        return args -> {
            // Save Enseignant entities
            /*
            Enseignant e1 = new Enseignant("Mahdi", "Toumi", "Mahdi.Toumi");
            Enseignant e2 = new Enseignant("Ahmed", "Toumi", "Ahmed.Toumi");
            Enseignant e3 = new Enseignant("Hama", "Toumi", "Hama.Toumi");
            Enseignant e4 = new Enseignant("Sabrine", "Toumi", "Sabrine.Toumi");
            enseignantRepository.saveAll(List.of(e1, e2, e3, e4));

            // Save Soutenance entities
            Soutenance S1 = new Soutenance(
                    LocalDate.of(2025, 12, 12),
                    5,
                    LocalTime.of(10, 30),
                    33L,
                    e4, // Use the saved Enseignant entity
                    List.of(e2, e3), // Use the saved Enseignant entities
                    "Conception"
            );

            Soutenance S2 = new Soutenance(
                    LocalDate.of(2025, 11, 20),
                    3,
                    LocalTime.of(14, 00),
                    21L,
                    e1, // Use the saved Enseignant entity
                    List.of(e2, e3), // Use the saved Enseignant entities
                    "Machine Learning"
            );

            Soutenance S3 = new Soutenance(
                    LocalDate.of(2025, 10, 5),
                    2,
                    LocalTime.of(9, 00),
                    15L,
                    e3, // Use the saved Enseignant entity
                    List.of(e1, e4), // Use the saved Enseignant entities
                    "Blockchain Security"
            );

            Soutenance S4 = new Soutenance(
                    LocalDate.of(2025, 9, 18),
                    4,
                    LocalTime.of(13, 45),
                    44L,
                    e3, // Use the saved Enseignant entity
                    List.of(e2, e1), // Use the saved Enseignant entities
                    "Big Data Analysis"
            );

            Soutenance S5 = new Soutenance(
                    LocalDate.of(2025, 8, 10),
                    1,
                    LocalTime.of(15, 30),
                    27L,
                    e2, // Use the saved Enseignant entity
                    List.of(e3, e4), // Use the saved Enseignant entities
                    "AI in Healthcare"
            );

            soutenanceRepository.saveAll(List.of(S1, S2, S3, S4, S5));*/
        };
    }
}