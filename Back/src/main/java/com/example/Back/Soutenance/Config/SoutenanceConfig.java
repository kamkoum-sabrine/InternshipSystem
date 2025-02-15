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
                    LocalDate.of(2025,12,12),
                     5,
                    LocalTime.of(10,30),
                    (long)33,
                    (long)2 ,
                    List.of("Dr Iyed","Dr Brahmi"),
                    "Conseption"
            );



            repository.saveAll(
                    List.of(S1)
            );
        };

    }

}
