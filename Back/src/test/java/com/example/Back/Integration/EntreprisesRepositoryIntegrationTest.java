package com.example.Back.Integration;

import com.example.Back.Entreprises.Models.Entreprise;
import com.example.Back.Entreprises.Repositories.EntreprisesRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
class EntreprisesRepositoryIntegrationTest {

    @Autowired
    private EntreprisesRepository entreprisesRepository;

    @Test
    void testSaveEntreprise() {
        Entreprise entreprise = new Entreprise();
        entreprise.setNom("Test Entreprise");
        entreprise.setAdresse("123 rue Exemple");
        entreprise.setEmail("test@entreprise.com");
        entreprise.setTelephone(21234567L); // ⚠️ Obligatoire
        entreprise.setDomaineActivites("Informatique");
        entreprise.setRepresentePar("Monsieur X");
        entreprise.setSiteWeb("www.entreprise.com");

        Entreprise saved = entreprisesRepository.save(entreprise);

        assertThat(saved.getId()).isNotNull();
    }

    @Test
    void testFindByEmail() {
        Entreprise entreprise = new Entreprise();
        entreprise.setNom("Email Entreprise");
        entreprise.setAdresse("Rue Email");
        entreprise.setEmail("email@entreprise.com");
        entreprise.setTelephone(21234568L);
        entreprisesRepository.save(entreprise);

        Optional<Entreprise> found = entreprisesRepository.findByEmail("email@entreprise.com");

        assertThat(found).isPresent();
        assertThat(found.get().getNom()).isEqualTo("Email Entreprise");
    }

    @Test
    void testExistsByNomAndAdresse() {
        Entreprise entreprise = new Entreprise();
        entreprise.setNom("NomAdresse Entreprise");
        entreprise.setAdresse("Adresse Test");
        entreprise.setEmail("nomadresse@entreprise.com");
        entreprise.setTelephone(21234569L);
        entreprisesRepository.save(entreprise);

        boolean exists = entreprisesRepository.existsByNomAndAdresse("NomAdresse Entreprise", "Adresse Test");
        boolean notExists = entreprisesRepository.existsByNomAndAdresse("Autre Nom", "Adresse Test");

        assertThat(exists).isTrue();
        assertThat(notExists).isFalse();
    }

    @Test
    void testExistsByTelephone() {
        Entreprise entreprise = new Entreprise();
        entreprise.setNom("Tel Entreprise");
        entreprise.setAdresse("Adresse Tel");
        entreprise.setEmail("tel@entreprise.com");
        entreprise.setTelephone(21234570L);
        entreprisesRepository.save(entreprise);

        assertThat(entreprisesRepository.existsByTelephone(21234570L)).isTrue();
        assertThat(entreprisesRepository.existsByTelephone(99999999L)).isFalse();
    }

    @Test
    void testFindByNomAdresseEmail() {
        Entreprise entreprise = new Entreprise();
        entreprise.setNom("NomComplet Entreprise");
        entreprise.setAdresse("Adresse Complete");
        entreprise.setEmail("complet@entreprise.com");
        entreprise.setTelephone(21234571L);
        entreprisesRepository.save(entreprise);

        Optional<Entreprise> found = entreprisesRepository.findByNomAndAdresseAndEmail(
                "NomComplet Entreprise", "Adresse Complete", "complet@entreprise.com");

        assertThat(found).isPresent();
        assertThat(found.get().getTelephone()).isEqualTo(21234571L);
    }

}
