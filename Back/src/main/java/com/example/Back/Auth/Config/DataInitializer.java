package com.example.Back.Auth.Config;


import com.example.Back.Entreprises.Models.Entreprise;
import com.example.Back.Entreprises.Repositories.EntreprisesRepository;

import com.example.Back.Soutenance.Model.Enseignant;
import com.example.Back.Soutenance.Model.Soutenance;
import com.example.Back.Soutenance.Repository.EnseignantRepository;
import com.example.Back.Soutenance.Repository.SoutenanceRepository;

import com.example.Back.enums.Filiere;
import com.example.Back.enums.Formation;
import com.example.Back.enums.Niveau;
import com.example.Back.enums.Sexe;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.Back.Auth.Models.Role;
import com.example.Back.Auth.Models.User;
import com.example.Back.Auth.Repositories.RoleRepository;
import com.example.Back.Auth.Repositories.UserRepository;

import jakarta.transaction.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

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
    private final EnseignantRepository enseignantRepository;
    private final SoutenanceRepository soutenanceRepository;
    private final EntreprisesRepository entreprisesRepository;

   

    public DataInitializer(UserRepository userRepository, RoleRepository roleRepository, EnseignantRepository enseignantRepository, SoutenanceRepository soutenanceRepository,EntreprisesRepository entreprisesRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.enseignantRepository = enseignantRepository;
        this.soutenanceRepository = soutenanceRepository;
    this.entreprisesRepository = entreprisesRepository;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {

            Role adminRole = new Role(null, "SUPER_ADMINISTRATEUR");
            Role serviceRole = new Role(null, "SERVICE_STAGE");
            Role directionRole = new Role(null, "DIRECTION_STAGE");
            Role etudiantRole = new Role(null, "ETUDIANT");
            Role ComiteStageRole = new Role(null, "COMITE_STAGE");
            Role DirectionEnicarRole = new Role(null, "DIRECTION_ENICAR");
            Role ChefDepartementInfoRole = new Role(null, "CHEF_DEPARTEMENT_INFO");
            Role ChefDepartementElecRole = new Role(null, "CHEF_DEPARTEMENT_ELECTRIQUE");
            Role ChefDepartementIndusRole = new Role(null, "CHEF_DEPARTEMENT_INDUS");


            roleRepository.save(adminRole);
            roleRepository.save(serviceRole);
            roleRepository.save(directionRole);
            roleRepository.save(etudiantRole);
            roleRepository.save(ComiteStageRole);
            roleRepository.save(DirectionEnicarRole);
            roleRepository.save(ChefDepartementInfoRole);
            roleRepository.save(ChefDepartementElecRole);
            roleRepository.save(ChefDepartementIndusRole);

            User directriceUser = new User(null, "Directrice", "Directrice", "directionEnicar@gmail.com",123456,null,null, new BCryptPasswordEncoder().encode("password"),
                    null,null,null,null,null,null,null,null,null,DirectionEnicarRole, false, LocalDateTime.now());

            User comitePedagogiqueUser = new User(null, "Comite", "Pédagogique", "comitepedagogique@gmail.com",123456,null,null, new BCryptPasswordEncoder().encode("password"),
                    null,null,null,null,null,null,null,null,null,ComiteStageRole, false, LocalDateTime.now());

            User chefDepInfo = new User(null, "Chef dep", "Info", "chefDepInfo@gmail.com",123456,null,null, new BCryptPasswordEncoder().encode("password"),
                    null,null,null,null,null,null,null,null,null,ChefDepartementInfoRole, false, LocalDateTime.now());

            User chefDepElec = new User(null, "Chef dep", "Electrique", "chefDepElec@gmail.com",123456,null,null, new BCryptPasswordEncoder().encode("password"),
                    null,null,null,null,null,null,null,null,null,ChefDepartementElecRole, false, LocalDateTime.now());

            User chefDepIndus = new User(null, "Chef dep", "Industriel", "chefDepIndus@gmail.com",123456,null,null, new BCryptPasswordEncoder().encode("password"),
                    null,null,null,null,null,null,null,null,null,ChefDepartementIndusRole, false, LocalDateTime.now());

            User superAdminUser = new User(null, "Kamkoum", "Sabrine", "kamkoumsabrine@gmail.com",123456,null,null, new BCryptPasswordEncoder().encode("password"),

                    null,null,null,null,null,null,null,null,null,adminRole, false, LocalDateTime.now());
            User directionStageUser = new User(null, "Salhi", "Houssem", "salhihoussem@gmail.com",21212,null,null, new BCryptPasswordEncoder().encode("password"),
                    null,null,null,null,null,null,null,null,null,directionRole,
                    false,LocalDateTime.now());
            User serviceStageUser = new User(null, "Toumi", "Mahdi", "toumimahdi@gmail.com",2145412,null,null, new BCryptPasswordEncoder().encode("password"),null,null,null,null,null,null,null,null,null, serviceRole,
                    false,LocalDateTime.now());
            User etudiantUser = new User(null, "Ahmed", "Ahmed", "ahmedahmed@gmail.com",5656565, Filiere.Informatique, Niveau.TROISIEME, new BCryptPasswordEncoder().encode("password"),"mourouj","info","8888", Sexe.Masculin,"98578525","96321455", Formation.Ingénierie,LocalDate.of(2001,10,26),null, etudiantRole,
                    false,LocalDateTime.now());
            User etudiantUser1 = new User(null, "Amine", "Amine", "Amineamine@gmail.com",123456,Filiere.Informatique,Niveau.TROISIEME, new BCryptPasswordEncoder().encode("password"),null,null,null,null,null,null,null, null,null,etudiantRole,
                    false,LocalDateTime.now());
            User etudiantUser2 = new User(null, "Mahdi", "Mahdi", "Mahdimahdi@gmail.com",123456,null,null, new BCryptPasswordEncoder().encode("password"),null,null,null,null,null,null,null,null, null,etudiantRole,
                    false,LocalDateTime.now());
            User etudiantUser3 = new User(null, "Sabrine", "Sabrine", "Sabrinesabroucha@gmail.com",123456,null, null,new BCryptPasswordEncoder().encode("password"),null,null,null,null,null,null,null,null,null, etudiantRole,
                    false,LocalDateTime.now());
            User etudiantUser4 = new User(null, "Salhi", "Hama", "HamaSalhi@gmail.com",123456,null,null, new BCryptPasswordEncoder().encode("password"),null,null,null,null,null,null,null,null,null, etudiantRole,
                    false,LocalDateTime.now());


            userRepository.save(superAdminUser);
            userRepository.save(directionStageUser);
            userRepository.save(serviceStageUser);
            userRepository.save(etudiantUser);
            userRepository.save(etudiantUser1);
            userRepository.save(etudiantUser2);
            userRepository.save(etudiantUser3);
            userRepository.save(etudiantUser4);
            userRepository.save(directriceUser);
            userRepository.save(comitePedagogiqueUser);
            userRepository.save(chefDepIndus);
            userRepository.save(chefDepInfo);
            userRepository.save(chefDepElec);

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
                    etudiantUser,
                    e4, // Use the saved Enseignant entity
                    List.of(e2, e3), // Use the saved Enseignant entities
                    "Conception"
            );

            Soutenance S2 = new Soutenance(
                    LocalDate.of(2025, 11, 20),
                    3,
                    LocalTime.of(14, 00),
                    etudiantUser1,
                    e1, // Use the saved Enseignant entity
                    List.of(e2, e3), // Use the saved Enseignant entities
                    "Machine Learning"
            );

            Soutenance S3 = new Soutenance(
                    LocalDate.of(2025, 10, 5),
                    2,
                    LocalTime.of(9, 00),
                    etudiantUser2,
                    e3, // Use the saved Enseignant entity
                    List.of(e1, e4), // Use the saved Enseignant entities
                    "Blockchain Security"
            );

            Soutenance S4 = new Soutenance(
                    LocalDate.of(2025, 9, 18),
                    4,
                    LocalTime.of(13, 45),
                    etudiantUser3,
                    e3, // Use the saved Enseignant entity
                    List.of(e2, e1), // Use the saved Enseignant entities
                    "Big Data Analysis"
            );

            Soutenance S5 = new Soutenance(
                    LocalDate.of(2025, 8, 10),
                    1,
                    LocalTime.of(15, 30),
                    etudiantUser4,
                    e2, // Use the saved Enseignant entity
                    List.of(e3, e4), // Use the saved Enseignant entities
                    "AI in Healthcare"
            );

            soutenanceRepository.saveAll(List.of(S1, S2, S3, S4, S5));

            System.out.println("Données initiales insérées !");
            if (entreprisesRepository.count() == 0) {
                Entreprise entreprise1 = new Entreprise(null, "TechCorp", "123 Rue de la Technologie", "contact@techcorp.com", 123456789L,"www.techCorp@techcorp.tn", "Informatique", "Mr Hama");
                Entreprise entreprise2 = new Entreprise(null, "InnoSoft", "456 Avenue de l'Innovation", "contact@innosoft.com", 987654321L,null, null, "Mr Mahdi");

                entreprisesRepository.save(entreprise1);
                entreprisesRepository.save(entreprise2);

                System.out.println("Entreprises initiales insérées !");
        }
    }
}}
