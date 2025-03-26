package com.example.Back.Auth.Config;

import com.example.Back.Entreprises.Models.Entreprise;
import com.example.Back.Entreprises.Repositories.EntreprisesRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.Back.Auth.Models.Role;
import com.example.Back.Auth.Models.User;
import com.example.Back.Auth.Repositories.RoleRepository;
import com.example.Back.Auth.Repositories.UserRepository;

import jakarta.transaction.Transactional;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {
    /**
     * @Bean
     *       CommandLineRunner initDatabase(RoleRepository roleRepository) {
     *       return args -> {
     *       roleRepository.save(new Role(null, "Super Administrateur"));
     *       roleRepository.save(new Role(null, "Service Stage"));
     *       roleRepository.save(new Role(null, "Direction stage"));
     *       roleRepository.save(new Role(null, "Etudiant"));
     *       System.out.println("Users inserted successfully!");
     *       };
     *       }
     **/

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final EntreprisesRepository entreprisesRepository;
    public DataInitializer(UserRepository userRepository, RoleRepository roleRepository,EntreprisesRepository entreprisesRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.entreprisesRepository = entreprisesRepository;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {

            Role adminRole = new Role(null, "Super Administrateur");
            Role serviceRole = new Role(null, "Service Stage");
            Role directionRole = new Role(null, "Direction stage");
            Role etudiantRole = new Role(null, "Etudiant");

            roleRepository.save(adminRole);
            roleRepository.save(serviceRole);
            roleRepository.save(directionRole);
            roleRepository.save(etudiantRole);

            User superAdminUser = new User(null, "Kamkoum", "Sabrine", "kamkoumsabrine@gmail.com", "password",
                    adminRole, false, LocalDateTime.now());
            User directionStageUser = new User(null, "Salhi", "Houssem", "salhihoussem@gmail.com", "password",
                    directionRole,
                    false,LocalDateTime.now());
            User serviceStageUser = new User(null, "Toumi", "Mahdi", "toumimahdi@gmail.com", "password", serviceRole,
                    false,LocalDateTime.now());
            User etudiantUser = new User(null, "Ahmed", "Ahmed", "ahmedahmed@gmail.com", "password", etudiantRole,
                    false,LocalDateTime.now());

            userRepository.save(superAdminUser);
            userRepository.save(directionStageUser);
            userRepository.save(serviceStageUser);
            userRepository.save(etudiantUser);

            System.out.println("Données initiales insérées !");
            if (entreprisesRepository.count() == 0) {
                Entreprise entreprise1 = new Entreprise(null, "TechCorp", "123 Rue de la Technologie", "contact@techcorp.com", 123456789L);
                Entreprise entreprise2 = new Entreprise(null, "InnoSoft", "456 Avenue de l'Innovation", "contact@innosoft.com", 987654321L);

                entreprisesRepository.save(entreprise1);
                entreprisesRepository.save(entreprise2);

                System.out.println("Entreprises initiales insérées !");
        }
    }
}}
