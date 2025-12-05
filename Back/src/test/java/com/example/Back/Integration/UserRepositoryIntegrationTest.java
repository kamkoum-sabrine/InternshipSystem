package com.example.Back.Integration;


import com.example.Back.Auth.Models.Role;
import com.example.Back.Auth.Models.User;
import com.example.Back.Auth.Repositories.RoleRepository;
import com.example.Back.Auth.Repositories.UserRepository;
import com.example.Back.TestConfig;
import com.example.Back.enums.Filiere;
import com.example.Back.enums.Niveau;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@Import(TestConfig.class)
@ActiveProfiles("test")
class UserRepositoryIntegrationTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    private Role etudiantRole;
    private Role enseignantRole;
    private Role adminRole;

    @BeforeEach
    void setUp() {
        // Créer les rôles
        etudiantRole = new Role();
        etudiantRole.setNom("ETUDIANT");
        etudiantRole = entityManager.persist(etudiantRole);

        enseignantRole = new Role();
        enseignantRole.setNom("ENSEIGNANT");
        enseignantRole = entityManager.persist(enseignantRole);

        adminRole = new Role();
        adminRole.setNom("ADMIN");
        adminRole = entityManager.persist(adminRole);

        entityManager.flush();
    }

    @Test
    void shouldFindUserByEmail() {
        // Given
        User user = createUser("test@example.com", "Test", "User", etudiantRole);
        entityManager.persist(user);
        entityManager.flush();

        // When
        Optional<User> found = userRepository.findUserByEmail("test@example.com");

        // Then
        assertThat(found).isPresent();
        assertThat(found.get().getEmail()).isEqualTo("test@example.com");
        assertThat(found.get().getNom()).isEqualTo("Test");
        assertThat(found.get().getPrenom()).isEqualTo("User");
    }

    @Test
    void shouldReturnEmptyWhenEmailNotFound() {
        // When
        Optional<User> found = userRepository.findUserByEmail("notfound@example.com");

        // Then
        assertThat(found).isEmpty();
    }

    @Test
    void shouldFindUserById() {
        // Given
        User user = createUser("id@example.com", "ID", "Test", etudiantRole);
        User savedUser = entityManager.persist(user);
        entityManager.flush();

        // When
        Optional<User> found = userRepository.findUserById(savedUser.getId());

        // Then
        assertThat(found).isPresent();
        assertThat(found.get().getId()).isEqualTo(savedUser.getId());
    }

    @Test
    void shouldCheckIfEmailExists() {
        // Given
        User user = createUser("exists@example.com", "Exists", "Test", etudiantRole);
        entityManager.persist(user);
        entityManager.flush();

        // When
        Boolean exists = userRepository.existsByEmailIgnoreCase("exists@example.com");
        Boolean existsUpperCase = userRepository.existsByEmailIgnoreCase("EXISTS@EXAMPLE.COM");
        Boolean notExists = userRepository.existsByEmailIgnoreCase("notexists@example.com");

        // Then
        assertThat(exists).isTrue();
        assertThat(existsUpperCase).isTrue();
        assertThat(notExists).isFalse();
    }

    @Test
    void shouldCheckIfTelExists() {
        // Given
        User user = createUser("tel@example.com", "Tel", "Test", etudiantRole);
        user.setTel("21234567");
        entityManager.persist(user);
        entityManager.flush();

        // When
        Boolean exists = userRepository.existsByTel("21234567");
        Boolean notExists = userRepository.existsByTel("99999999");

        // Then
        assertThat(exists).isTrue();
        assertThat(notExists).isFalse();
    }

    @Test
    void shouldGetUsersByRole() {
        // Given
        User etudiant1 = createUser("etudiant1@example.com", "Etudiant1", "Test", etudiantRole);
        User etudiant2 = createUser("etudiant2@example.com", "Etudiant2", "Test", etudiantRole);
        User enseignant = createUser("enseignant@example.com", "Enseignant", "Test", enseignantRole);

        entityManager.persist(etudiant1);
        entityManager.persist(etudiant2);
        entityManager.persist(enseignant);
        entityManager.flush();

        // When
        List<User> etudiants = userRepository.getUsersByRole(etudiantRole);
        List<User> enseignants = userRepository.getUsersByRole(enseignantRole);

        // Then
        assertThat(etudiants).hasSize(2);
        assertThat(enseignants).hasSize(1);
    }

    @Test
    void shouldCountUsersByRole() {
        // Given
        entityManager.persist(createUser("etudiant1@example.com", "E1", "Test", etudiantRole));
        entityManager.persist(createUser("etudiant2@example.com", "E2", "Test", etudiantRole));
        entityManager.persist(createUser("etudiant3@example.com", "E3", "Test", etudiantRole));
        entityManager.persist(createUser("enseignant1@example.com", "Ens1", "Test", enseignantRole));
        entityManager.persist(createUser("admin1@example.com", "Admin1", "Test", adminRole));
        entityManager.flush();

        // When
        List<Object[]> results = userRepository.countUsersByRole();

        // Then
        assertThat(results).hasSize(3);

        // Vérifier les comptages
        boolean foundEtudiant = false;
        boolean foundEnseignant = false;
        boolean foundAdmin = false;

        for (Object[] result : results) {
            String roleName = (String) result[0];
            Long count = (Long) result[1];

            if ("ETUDIANT".equals(roleName)) {
                assertThat(count).isEqualTo(3L);
                foundEtudiant = true;
            } else if ("ENSEIGNANT".equals(roleName)) {
                assertThat(count).isEqualTo(1L);
                foundEnseignant = true;
            } else if ("ADMIN".equals(roleName)) {
                assertThat(count).isEqualTo(1L);
                foundAdmin = true;
            }
        }

        assertThat(foundEtudiant).isTrue();
        assertThat(foundEnseignant).isTrue();
        assertThat(foundAdmin).isTrue();
    }

    @Test
    void shouldCountActiveStatus() {
        // Given
        User activeUser1 = createUser("active1@example.com", "Active1", "Test", etudiantRole);
        activeUser1.setActive(true);

        User activeUser2 = createUser("active2@example.com", "Active2", "Test", etudiantRole);
        activeUser2.setActive(true);

        User inactiveUser = createUser("inactive@example.com", "Inactive", "Test", etudiantRole);
        inactiveUser.setActive(false);

        entityManager.persist(activeUser1);
        entityManager.persist(activeUser2);
        entityManager.persist(inactiveUser);
        entityManager.flush();

        // When
        List<Object[]> results = userRepository.countActiveStatus();

        // Then
        assertThat(results).hasSize(2);

        for (Object[] result : results) {
            Boolean active = (Boolean) result[0];
            Long count = (Long) result[1];

            if (active) {
                assertThat(count).isEqualTo(2L);
            } else {
                assertThat(count).isEqualTo(1L);
            }
        }
    }

    @Test
    void shouldCountStudentsByFiliere() {
        // Given
        User student1 = createUser("gl1@example.com", "GL1", "Student", etudiantRole);
        student1.setFiliere(Filiere.GSIL);

        User student2 = createUser("gl2@example.com", "GL2", "Student", etudiantRole);
        student2.setFiliere(Filiere.GSIL);

        User student3 = createUser("rt1@example.com", "RT1", "Student", etudiantRole);
        student3.setFiliere(Filiere.Mecatronique);

        entityManager.persist(student1);
        entityManager.persist(student2);
        entityManager.persist(student3);
        entityManager.flush();

        // When
        List<Object[]> results = userRepository.countStudentsByFiliere();

        // Then
        assertThat(results).hasSize(2);

        for (Object[] result : results) {
            Filiere filiere = (Filiere) result[0];
            Long count = (Long) result[1];

            if (filiere == Filiere.GSIL) {
                assertThat(count).isEqualTo(2L);
            } else if (filiere == Filiere.Informatique) {
                assertThat(count).isEqualTo(1L);
            }
        }
    }



    @Test
    void shouldNotCountEnseignantsInStudentQueries() {
        // Given
        User etudiant = createUser("etudiant@example.com", "Etudiant", "Test", etudiantRole);
        etudiant.setFiliere(Filiere.Mecatronique);
        etudiant.setNiveau(Niveau.DEUXIEME);

        User enseignant = createUser("enseignant@example.com", "Enseignant", "Test", enseignantRole);
        enseignant.setFiliere(Filiere.Mecatronique);
        enseignant.setNiveau(Niveau.TROISIEME);

        entityManager.persist(etudiant);
        entityManager.persist(enseignant);
        entityManager.flush();

        // When
        List<Object[]> byFiliere = userRepository.countStudentsByFiliere();
        List<Object[]> byNiveau = userRepository.countStudentsByNiveau();
        List<Object[]> byBoth = userRepository.countStudentsByFiliereAndNiveau();

        // Then - Seul l'étudiant doit être compté
        assertThat(byFiliere).hasSize(1);
        assertThat(byFiliere.get(0)[1]).isEqualTo(1L);

        assertThat(byNiveau).hasSize(1);
        assertThat(byNiveau.get(0)[1]).isEqualTo(1L);

        assertThat(byBoth).hasSize(1);
        assertThat(byBoth.get(0)[2]).isEqualTo(1L);
    }


    // Méthode helper pour créer un utilisateur
    private User createUser(String email, String nom, String prenom, Role role) {
        User user = new User();
        user.setEmail(email);
        user.setNom(nom);
        user.setPrenom(prenom);
        user.setPassword("password123");
        user.setRole(role);
        user.setActive(true);
        user.setCin(12345678);
        return user;
    }
}