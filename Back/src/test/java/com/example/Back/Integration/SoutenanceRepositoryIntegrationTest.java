package com.example.Back.Integration;

import com.example.Back.Auth.Models.Role;
import com.example.Back.Auth.Models.User;
import com.example.Back.Auth.Repositories.RoleRepository;
import com.example.Back.Auth.Repositories.UserRepository;
import com.example.Back.Soutenance.Model.Enseignant;
import com.example.Back.Soutenance.Model.Soutenance;
import com.example.Back.Soutenance.Repository.EnseignantRepository;
import com.example.Back.Soutenance.Repository.SoutenanceRepository;
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
import java.time.LocalTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
class SoutenanceRepositoryIntegrationTest {

    @Autowired
    private SoutenanceRepository soutenanceRepository;

    @Autowired
    private EnseignantRepository enseignantRepository;

    @Autowired
    private UserRepository etudiantRepository;

    // NOUVEAU: Ajout du RoleRepository pour persister les dépendances
    @Autowired
    private RoleRepository roleRepository;

    // Dates et heures de test
    private final LocalDate TEST_DATE_1 = LocalDate.of(2025, 6, 15);
    private final LocalDate TEST_DATE_2 = LocalDate.of(2025, 6, 16);
    private final LocalTime TEST_HEURE_1 = LocalTime.of(10, 0);
    private final LocalTime TEST_HEURE_2 = LocalTime.of(14, 0);

    // Entités liées persistantes
    private Enseignant encadrant1;
    private Enseignant encadrant2;
    private Enseignant membreJury1;
    private Enseignant membreJury2;
    private Role etudiantRole; // 👈 Le Role doit être persisté une fois

    @BeforeEach
    void setUp() {
        // 1. Sauvegarder le Role nécessaire (pour éviter TransientPropertyValueException)
        Role transientRole = new Role(null, "ETUDIANT");
        etudiantRole = roleRepository.save(transientRole);

        // 2. Sauvegarde des enseignants nécessaires pour les relations
        encadrant1 = saveTestEnseignant("EncadrantAlpha", "alpha@univ.tn");
        encadrant2 = saveTestEnseignant("EncadrantBeta", "beta@univ.tn");
        membreJury1 = saveTestEnseignant("JuryMembre1", "jury1@univ.tn");
        membreJury2 = saveTestEnseignant("JuryMembre2", "jury2@univ.tn");

        // 3. Nettoyer la table Soutenance avant chaque test
        soutenanceRepository.deleteAll();
    }

    // --- Helper methods ---

    private Enseignant saveTestEnseignant(String nom, String email) {
        Enseignant enseignant = new Enseignant();
        enseignant.setNom(nom);
        enseignant.setEmail(email);
        return enseignantRepository.save(enseignant);
    }

    // ⚠️ La méthode est simplifiée pour créer un Etudiant valide
    private User saveTestEtudiant(String nom, String prenom, String email, Integer cin) {
        // Utiliser l'objet Role persistant 'this.etudiantRole'
        User etudiant = new User(
                null, // Laissez l'ID à null pour l'auto-génération
                nom,
                prenom,
                email,
                cin,
                Filiere.Informatique,
                Niveau.TROISIEME,
                new BCryptPasswordEncoder().encode("password"),
                null, null, null, null, null, null, null, null, null,
                this.etudiantRole, // 👈 UTILISATION DU ROLE PERSISTANT
                false,
                LocalDateTime.now()
        );
        return etudiantRepository.save(etudiant);
    }

    private Soutenance createAndSaveSoutenance(Long etudiantId, Enseignant encadrant, List<Enseignant> jury, LocalDate date, LocalTime heure, Integer salle) {
        Soutenance soutenance = new Soutenance();
        // Correction de l'erreur NoSuchElementException en s'assurant que l'Etudiant existe
        soutenance.setEtudiant(etudiantRepository.findById(etudiantId)
                .orElseThrow(() -> new RuntimeException("L'étudiant avec l'ID " + etudiantId + " n'a pas été trouvé pour le test!")));
        soutenance.setEncadrant(encadrant);
        soutenance.setJury(jury);
        soutenance.setDate(date);
        soutenance.setHeure(heure);
        soutenance.setSalle(salle);
        soutenance.setSujet("Thème Etudiant " + etudiantId);
        return soutenanceRepository.save(soutenance);
    }

    // --- Tests des méthodes CRUD de base et Finders personnalisés ---

    // ⚠️ NOTE: Les tests suivants qui utilisent createAndSaveSoutenance(ID_FIXE, ...)
    // sans créer l'étudiant au préalable VONT ÉCHOUER (NoSuchElementException), car vous
    // vous basez sur un ID fixe (e.g., 1L, 3L, 4L) alors que la DB en mémoire auto-génère
    // les IDs. Seul le test testFindSoutenanceById est correctement corrigé pour l'instant.

    // --- TESTS CORRIGÉS ET SIMPLIFIÉS EN UTILISANT LA CRÉATION PRÉALABLE ---

    @Test
    void testSaveSoutenance() {
        // GIVEN
        User etudiant = saveTestEtudiant("Save", "Test", "save@test.com", 1);

        // WHEN
        Soutenance soutenance = createAndSaveSoutenance(etudiant.getId(), encadrant1, Collections.emptyList(), TEST_DATE_1, TEST_HEURE_1, 101);

        // THEN
        assertThat(soutenance.getId()).isNotNull();
        assertThat(soutenance.getEncadrant()).isEqualTo(encadrant1);
    }

    @Test
    void testFindSoutenanceById() {
        // 1. GIVEN : Sauvegarder l'étudiant d'abord (Résolution de la NoSuchElementException)
        User etudiant = saveTestEtudiant("Kamkoum","Sabrine", "etudiant@test.com", 12564);
        Long etudiantId = etudiant.getId();

        // 2. GIVEN : Sauvegarder la soutenance en utilisant l'ID valide
        Soutenance saved = createAndSaveSoutenance(
                etudiantId,
                encadrant1,
                Collections.emptyList(),
                TEST_DATE_1,
                TEST_HEURE_1,
                102
        );

        // 3. WHEN
        Soutenance found = soutenanceRepository.findSoutenanceById(saved.getId());

        // 4. THEN
        assertThat(found).isNotNull();
        assertThat(found.getEtudiant().getId()).isEqualTo(etudiantId);
    }

    @Test
    void testFindSoutenanceByEtudiantId_Found() {
        // GIVEN: Création d'un étudiant spécifique
        User etudiant = saveTestEtudiant("EtudiantID", "A", "id@test.com", 3);
        Long etudiantId = etudiant.getId();
        createAndSaveSoutenance(etudiantId, encadrant1, Collections.emptyList(), TEST_DATE_1, TEST_HEURE_1, 103);

        // WHEN
        Optional<Soutenance> found = soutenanceRepository.findSoutenanceByEtudiantId(etudiantId);

        // THEN
        assertThat(found).isPresent();
        assertThat(found.get().getSalle()).isEqualTo(103);
    }

    @Test
    void testFindSoutenanceByDate_Found() {
        // 1. GIVEN: Préparation des entités
        User etudiant1 = saveTestEtudiant("DateEtu1", "P1", "date1@test.com", 1);
        User etudiant2 = saveTestEtudiant("DateEtu2", "P2", "date2@test.com", 2);

        // 2. GIVEN: Créer deux soutenances sur des dates différentes
        createAndSaveSoutenance(etudiant1.getId(), encadrant1, Collections.emptyList(), TEST_DATE_1, TEST_HEURE_1, 104);
        createAndSaveSoutenance(etudiant2.getId(), encadrant2, Collections.emptyList(), TEST_DATE_2, TEST_HEURE_1, 105);

        // 3. WHEN: Recherche par la première date
        Optional<Soutenance> found = soutenanceRepository.findSoutenanceByDate(TEST_DATE_1);

        // 4. THEN
        assertThat(found).isPresent();
        assertThat(found.get().getEtudiant().getId()).isEqualTo(etudiant1.getId());

        // Test de non-trouvé pour la date 3
        Optional<Soutenance> notFound = soutenanceRepository.findSoutenanceByDate(LocalDate.of(2030, 1, 1));
        assertThat(notFound).isNotPresent();
    }

    @Test
    void testFindSoutenanceByEncadrant_Found() {
        // 1. GIVEN: Préparation de l'étudiant
        User etudiant = saveTestEtudiant("EncadrantEtu", "Etu", "encadrant@test.com", 5);

        // 2. GIVEN: Création de la soutenance
        createAndSaveSoutenance(etudiant.getId(), encadrant2, Collections.emptyList(), TEST_DATE_1, TEST_HEURE_2, 105);

        // 3. WHEN: Recherche par l'encadrant 2
        Optional<Soutenance> found = soutenanceRepository.findSoutenanceByEncadrant(encadrant2);

        // 4. THEN
        assertThat(found).isPresent();
        assertThat(found.get().getEtudiant().getId()).isEqualTo(etudiant.getId());

        // Test de non-trouvé pour l'encadrant 1 (qui n'a pas été utilisé ici)
        Optional<Soutenance> notFound = soutenanceRepository.findSoutenanceByEncadrant(encadrant1);
        assertThat(notFound).isNotPresent();
    }

    @Test
    void testRechercherSoutenances_FilterByDateAndHeure() {
        // GIVEN
        User etu1 = saveTestEtudiant("R3", "P", "r3@test.com", 3);
        User etu2 = saveTestEtudiant("R4", "P", "r4@test.com", 4);
        createAndSaveSoutenance(etu1.getId(), encadrant1, Collections.emptyList(), TEST_DATE_1, TEST_HEURE_1, 212); // Match
        createAndSaveSoutenance(etu2.getId(), encadrant2, Collections.emptyList(), TEST_DATE_2, TEST_HEURE_2, 213); // No match

        // WHEN: Recherche par date TEST_DATE_1 et heure TEST_HEURE_1
        List<Soutenance> results = soutenanceRepository.rechercherSoutenances(
                null, null, TEST_DATE_1, TEST_HEURE_1, null);

        // THEN
        assertThat(results).hasSize(1);
        assertThat(results.get(0).getEtudiant().getId()).isEqualTo(etu1.getId());
    }

    @Test
    void testFindConflicts_MultipleConflictsDetected() {
        // 1. GIVEN: Préparation des entités
        User etu1 = saveTestEtudiant("C1", "P", "c1@test.com", 1);
        User etu2 = saveTestEtudiant("C2", "P", "c2@test.com", 2);
        Enseignant juryMembre = saveTestEnseignant("JuryConflict", "jc@univ.tn");

        // GIVEN: Deux soutenances au même créneau (TEST_DATE_1, TEST_HEURE_1)

        // Soutenance A (Encadrant 1, Salle 500)
        Soutenance A = createAndSaveSoutenance(etu1.getId(), encadrant1, Collections.emptyList(), TEST_DATE_1, TEST_HEURE_1, 500);

        // Soutenance B (Jury Membre)
        Soutenance B = createAndSaveSoutenance(etu2.getId(), encadrant2, Arrays.asList(juryMembre), TEST_DATE_1, TEST_HEURE_1, 501);

        // 2. WHEN: On cherche à créer une soutenance C qui :
        // - Utilise la salle 500 (conflit avec A)
        // - Utilise l'encadrant 2 (conflit avec B)
        // - Utilise le membre du jury 'juryMembre' (conflit avec B)
        List<Soutenance> conflicts = soutenanceRepository.findConflicts(
                TEST_DATE_1, TEST_HEURE_1,
                99L, // Nouvel étudiant
                encadrant1.getId(), // Conflit avec Soutenance A
                Arrays.asList(juryMembre.getId()), // Conflit avec Soutenance B
                500, // Conflit avec Soutenance A
                -1L
        );

        // 3. THEN: Les deux soutenances (A et B) devraient être retournées.
        assertThat(conflicts).hasSize(2);
        List<Long> conflictIds = Arrays.asList(conflicts.get(0).getId(), conflicts.get(1).getId());

        assertThat(conflictIds).contains(A.getId(), B.getId());
    }
}