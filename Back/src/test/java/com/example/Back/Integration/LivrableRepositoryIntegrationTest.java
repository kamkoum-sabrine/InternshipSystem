package com.example.Back.Integration;

import com.example.Back.Auth.Models.Role;
import com.example.Back.Auth.Models.User;
import com.example.Back.Auth.Repositories.RoleRepository;
import com.example.Back.Auth.Repositories.UserRepository;
import com.example.Back.Livrables.Models.Livrable;
import com.example.Back.Livrables.Repository.Livrablerepository;
import com.example.Back.enums.EtatLivrable;
import com.example.Back.enums.Filiere;
import com.example.Back.enums.Niveau;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
class LivrableRepositoryIntegrationTest {

    @Autowired
    private Livrablerepository livrableRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    private Role etudiantRole;
    private User etudiantA;
    private User etudiantB;

    @BeforeEach
    void setUp() {
        // 1. Sauvegarder le Role (dépendance non nullable de User)
        Role transientRole = new Role(null, "ETUDIANT");
        etudiantRole = roleRepository.save(transientRole);

        // 2. Créer et sauvegarder les étudiants
        etudiantA = saveTestEtudiant("Alice", "Smith", "alice@test.com", 1);
        etudiantB = saveTestEtudiant("Bob", "Jones", "bob@test.com", 2);

        // 3. Nettoyer la table Livrable avant chaque test
        livrableRepository.deleteAll();
    }

    // --- Helper Methods (Adapté de la conversation précédente) ---

    private User saveTestEtudiant(String nom, String prenom, String email, Integer cin) {
        User etudiant = new User(
                null, nom, prenom, email, cin, Filiere.Informatique,
                Niveau.TROISIEME, new BCryptPasswordEncoder().encode("password"),
                null, null, null, null, null, null, null, null, null,
                this.etudiantRole,
                true, LocalDateTime.now()
        );
        return userRepository.save(etudiant);
    }

    private Livrable createAndSaveLivrable(String nomFichier, User etudiant, boolean valide) {
        Livrable livrable = new Livrable();
        livrable.setTitre(nomFichier);
        livrable.setFichierPDFChemin("/path/to/" + nomFichier);
        livrable.setEtudiant(etudiant);
        livrable.setEtat(EtatLivrable.Déposé);
        livrable.setDateDepot(LocalDate.from(LocalDateTime.now()));
        // Définir d'autres champs non nullables si nécessaire (ex: titre, description)
        livrable.setTitre("Livrable de " + nomFichier);
        return livrableRepository.save(livrable);
    }

    // --- Tests des méthodes JpaRepository de base ---

    @Test
    void testSaveAndFindLivrableById() {
        // GIVEN
        Livrable saved = createAndSaveLivrable("rapport_alice.pdf", etudiantA, false);

        // WHEN
        Optional<Livrable> found = livrableRepository.findById(saved.getId());

        // THEN
        assertThat(found).isPresent();
        assertThat(found.get().getTitre()).isEqualTo("Livrable de rapport_alice.pdf");
        assertThat(found.get().getEtudiant().getId()).isEqualTo(etudiantA.getId());
    }

    @Test
    void testFindAllLivrables() {
        // GIVEN
        createAndSaveLivrable("rapport1.pdf", etudiantA, true);
        createAndSaveLivrable("rapport2.pdf", etudiantB, false);

        // WHEN
        List<Livrable> livrables = livrableRepository.findAll();

        // THEN
        assertThat(livrables).hasSize(2);
    }

    @Test
    void testDeleteLivrable() {
        // GIVEN
        Livrable saved = createAndSaveLivrable("a_supprimer.pdf", etudiantA, false);
        Long idToDelete = saved.getId();

        // WHEN
        livrableRepository.deleteById(idToDelete);

        // THEN
        Optional<Livrable> foundAfterDelete = livrableRepository.findById(idToDelete);
        assertThat(foundAfterDelete).isNotPresent();
    }

    // --- Test de la méthode personnalisée : findByEtudiant ---

    @Test
    void testFindByEtudiant_MultipleResults() {
        // GIVEN
        createAndSaveLivrable("livrable_alice_1.pdf", etudiantA, false);
        createAndSaveLivrable("livrable_alice_2.pdf", etudiantA, true);
        createAndSaveLivrable("livrable_bob_1.pdf", etudiantB, false); // Ne devrait pas être inclus

        // WHEN
        List<Livrable> livrablesAlice = livrableRepository.findByEtudiant(etudiantA);

        // THEN
        assertThat(livrablesAlice).hasSize(2);
        assertThat(livrablesAlice.stream().allMatch(l -> l.getEtudiant().getId().equals(etudiantA.getId()))).isTrue();
        assertThat(livrablesAlice).extracting(Livrable::getTitre)
                .containsExactlyInAnyOrder("Livrable de livrable_alice_1.pdf", "Livrable de livrable_alice_2.pdf");

        // Vérification pour Bob (pour s'assurer de l'isolation)
        List<Livrable> livrablesBob = livrableRepository.findByEtudiant(etudiantB);
        assertThat(livrablesBob).hasSize(1);
    }

    @Test
    void testFindByEtudiant_NoResult() {
        // GIVEN
        // Seuls livrables d'Alice et Bob existent

        // WHEN
        // Créer un étudiant C qui n'a pas de livrable
        User etudiantC = saveTestEtudiant("Charlie", "D", "charlie@test.com", 3);
        List<Livrable> livrablesCharlie = livrableRepository.findByEtudiant(etudiantC);

        // THEN
        assertThat(livrablesCharlie).isEmpty();
    }
}