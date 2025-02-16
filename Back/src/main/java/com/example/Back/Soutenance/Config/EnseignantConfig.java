package com.example.Back.Soutenance.Config;

import com.example.Back.Soutenance.Model.Enseignant;
import com.example.Back.Soutenance.Repository.EnseignantRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class EnseignantConfig {
    @Bean
    CommandLineRunner commandLineRunner1(EnseignantRepository repository) {
        return args -> {
            {
                Enseignant e1 = new Enseignant(
                        "Mahdi", "Toumi", "Mahdi.Toumi"
                );
                Enseignant e2 = new Enseignant(
                        "Ahmed", "Toumi", "Ahmed.Toumi"
                );
                Enseignant e3 = new Enseignant(
                        "Hama", "Toumi", "Hama.Toumi"
                );
                Enseignant e4 = new Enseignant(
                        "Sabrine", "Toumi", "Sabrine.Toumi"
                );
                repository.saveAll(List.of(e1,e2,e3,e4));

            }

        };

    }
}
