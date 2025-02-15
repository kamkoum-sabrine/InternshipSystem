package com.example.Back.Soutenance.Config;

import com.example.Back.Soutenance.Model.Soutenance;
import com.example.Back.Soutenance.Repository.SoutenanceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Month;
import java.util.List;

@Configuration
public class SoutenanceConfig {
    @Bean
    CommandLineRunner commandLineRunner(SoutenanceRepository repository) {
        return args -> {
            Soutenance S1 = new Soutenance(
                    LocalDate.of(2025, 12, 12),
                    5,
                    LocalTime.of(10, 30),
                    33L,
                    2L,
                    List.of("Dr Iyed", "Dr Brahmi"),
                    "Conception"
            );

            Soutenance S2 = new Soutenance(
                    LocalDate.of(2025, 11, 20),
                    3,
                    LocalTime.of(14, 00),
                    21L,
                    5L,
                    List.of("Dr Ahmed", "Dr Fatma"),
                    "Machine Learning"
            );

            Soutenance S3 = new Soutenance(
                    LocalDate.of(2025, 10, 5),
                    2,
                    LocalTime.of(9, 00),
                    15L,
                    8L,
                    List.of("Dr Sami", "Dr Khaled"),
                    "Blockchain Security"
            );

            Soutenance S4 = new Soutenance(
                    LocalDate.of(2025, 9, 18),
                    4,
                    LocalTime.of(13, 45),
                    44L,
                    3L,
                    List.of("Dr Leila", "Dr Mehdi"),
                    "Big Data Analysis"
            );

            Soutenance S5 = new Soutenance(
                    LocalDate.of(2025, 8, 10),
                    1,
                    LocalTime.of(15, 30),
                    27L,
                    6L,
                    List.of("Dr Nour", "Dr Habib"),
                    "AI in Healthcare"
            );

            repository.saveAll(List.of(S1, S2, S3, S4, S5));
        };
    }


}
