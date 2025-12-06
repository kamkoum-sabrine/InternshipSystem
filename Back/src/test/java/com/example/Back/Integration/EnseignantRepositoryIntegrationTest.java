package com.example.Back.Integration;

import com.example.Back.Soutenance.Model.Enseignant;
import com.example.Back.Soutenance.Repository.EnseignantRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Tests d'intégration pour l'interface EnseignantRepository.
 * Utilise @DataJpaTest pour tester la couche de persistance.
 */
@DataJpaTest
@ActiveProfiles("test")
class EnseignantRepositoryIntegrationTest {

    @Autowired
    private EnseignantRepository enseignantRepository;

    private Enseignant createTestEnseignant(String nom, String email) {
        Enseignant enseignant = new Enseignant();
        // Assurez-vous que l'entité Enseignant a les champs appropriés
        enseignant.setNom(nom);
        enseignant.setEmail(email);
        // Ajoutez d'autres champs si nécessaire (par exemple, prenom, matricule, etc.)
        return enseignant;
    }

    // --- Tests des méthodes CRUD de base (héritées de JpaRepository) ---

    @Test
    void testSaveEnseignant() {
        // GIVEN
        Enseignant enseignant = createTestEnseignant("Dupont", "dupont@example.com");

        // WHEN
        Enseignant saved = enseignantRepository.save(enseignant);

        // THEN
        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getNom()).isEqualTo("Dupont");
    }

    @Test
    void testFindById() {
        // GIVEN
        Enseignant enseignant = createTestEnseignant("Durand", "durand@example.com");
        Enseignant saved = enseignantRepository.save(enseignant);
        Long enseignantId = saved.getId();

        // WHEN
        Enseignant found = enseignantRepository.findById(enseignantId).orElse(null);

        // THEN
        assertThat(found).isNotNull();
        assertThat(found.getId()).isEqualTo(enseignantId);
        assertThat(found.getEmail()).isEqualTo("durand@example.com");
    }

    // --- Tests des méthodes spécifiques définies dans EnseignantRepository ---

    @Test
    void testFindEnseignantById() {
        // GIVEN
        Enseignant enseignant = createTestEnseignant("Lefevre", "lefevre@example.com");
        Enseignant saved = enseignantRepository.save(enseignant);
        Long enseignantId = saved.getId();

        // WHEN
        Enseignant found = enseignantRepository.findEnseignantById(enseignantId);

        // THEN
        assertThat(found).isNotNull();
        assertThat(found.getId()).isEqualTo(enseignantId);
        assertThat(found.getNom()).isEqualTo("Lefevre");
    }

    @Test
    void testFindEnseignantById_NotFound() {
        // WHEN
        // On cherche un ID qui n'existe pas, par exemple 9999L
        Enseignant found = enseignantRepository.findEnseignantById(9999L);

        // THEN
        assertThat(found).isNull();
    }

    @Test
    void testExistsByEmail_Exists() {
        // GIVEN
        Enseignant enseignant = createTestEnseignant("Martin", "martin@test.com");
        enseignantRepository.save(enseignant);

        // WHEN
        boolean exists = enseignantRepository.existsByEmail("martin@test.com");

        // THEN
        assertThat(exists).isTrue();
    }

    @Test
    void testExistsByEmail_NotExists() {
        // WHEN
        boolean exists = enseignantRepository.existsByEmail("nonexistent@test.com");

        // THEN
        assertThat(exists).isFalse();
    }
}