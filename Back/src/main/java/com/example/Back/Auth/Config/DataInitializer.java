package com.example.Back.Auth.Config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.Back.Auth.Models.Role;
import com.example.Back.Auth.Models.User;
import com.example.Back.Auth.Repositories.RoleRepository;
import com.example.Back.Auth.Repositories.UserRepository;

import jakarta.transaction.Transactional;

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

    public DataInitializer(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
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

            User superAdminUser = new User(null, "Kamkoum", "Sabrine", "kamkoumsabrine@gmail.com", adminRole, false);
            User directionStageUser = new User(null, "Salhi", "Houssem", "salhihoussem@gmail.com", directionRole,
                    false);
            User serviceStageUser = new User(null, "Toumi", "Mahdi", "toumimahdi@gmail.com", serviceRole, false);
            User etudiantUser = new User(null, "Ahmed", "Ahmed", "ahmedahmed@gmail.com", etudiantRole, false);

            userRepository.save(superAdminUser);
            userRepository.save(directionStageUser);
            userRepository.save(serviceStageUser);
            userRepository.save(etudiantUser);

            System.out.println("Données initiales insérées !");
        }
    }
}
