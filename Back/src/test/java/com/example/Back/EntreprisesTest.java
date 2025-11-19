package com.example.Back;

import com.example.Back.Entreprises.Controllers.EntreprisesController;
import com.example.Back.Entreprises.Models.Entreprise;
import com.example.Back.Entreprises.Services.EntreprisesService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class EntreprisesTest {

    private MockMvc mockMvc;

    @Mock
    private EntreprisesService entreprisesService;

    @InjectMocks
    private EntreprisesController entreprisesController;

    private ObjectMapper objectMapper;
    private Entreprise mockEntreprise;
    private Entreprise mockEntreprise2;

    @BeforeEach
    void setUp() {
        System.out.println(" Initialisation des tests EntreprisesController...");

        objectMapper = new ObjectMapper();
        mockMvc = MockMvcBuilders.standaloneSetup(entreprisesController).build();

        // Setup des entreprises mock
        mockEntreprise = new Entreprise();
        mockEntreprise.setId(1L);
        mockEntreprise.setNom("Google");
        mockEntreprise.setAdresse("Silicon Valley");
        mockEntreprise.setEmail("contact@google.com");
        mockEntreprise.setTelephone(123456789L);

        mockEntreprise2 = new Entreprise();
        mockEntreprise2.setId(2L);
        mockEntreprise2.setNom("Microsoft");
        mockEntreprise2.setAdresse("Redmond");
        mockEntreprise2.setEmail("contact@microsoft.com");
        mockEntreprise2.setTelephone(987654321L);

        System.out.println("Setup terminé - Prêt pour les tests");
    }

    // CAS 1: CRÉATION D'ENTREPRISE - SUCCÈS
    @Test
    void testCreateEntreprise_Success() throws Exception {
        System.out.println("TEST 1: Création d'entreprise - Succès");

        // Given
        when(entreprisesService.addEntreprise(any(Entreprise.class))).thenReturn(mockEntreprise);
        System.out.println("Mock configuré: addEntreprise retourne une entreprise avec ID=1");

        // When & Then
        System.out.println(" Exécution POST /api/entreprises");
        mockMvc.perform(post("/api/entreprises")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(mockEntreprise)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.nom").value("Google"))
                .andExpect(jsonPath("$.email").value("contact@google.com"));

        // Verify
        verify(entreprisesService, times(1)).addEntreprise(any(Entreprise.class));
        System.out.println("Vérification: addEntreprise appelé 1 fois");
        System.out.println("TEST 1 RÉUSSI: Création entreprise fonctionne correctement");
    }

    // CAS 2: RÉCUPÉRATION DE TOUTES LES ENTREPRISES
    @Test
    void testGetAllEntreprises_Success() throws Exception {
        System.out.println("TEST 2: Récupération de toutes les entreprises");

        // Given
        List<Entreprise> entreprises = Arrays.asList(mockEntreprise, mockEntreprise2);
        when(entreprisesService.getAllEntreprises()).thenReturn(entreprises);
        System.out.println("Mock configuré: getAllEntreprises retourne 2 entreprises");

        // When & Then
        System.out.println("Exécution GET /api/entreprises");
        mockMvc.perform(get("/api/entreprises"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].nom").value("Google"))
                .andExpect(jsonPath("$[1].nom").value("Microsoft"));

        // Verify
        verify(entreprisesService, times(1)).getAllEntreprises();
        System.out.println("Vérification: getAllEntreprises appelé 1 fois");
        System.out.println("TEST 2 RÉUSSI: Récupération liste entreprises fonctionne");
    }

    // CAS 3: RÉCUPÉRATION D'ENTREPRISES - LISTE VIDE
    @Test
    void testGetAllEntreprises_EmptyList() throws Exception {
        System.out.println("TEST 3: Récupération entreprises - Liste vide");

        // Given
        when(entreprisesService.getAllEntreprises()).thenReturn(List.of());
        System.out.println("Mock configuré: getAllEntreprises retourne liste vide");

        // When & Then
        System.out.println("Exécution GET /api/entreprises");
        mockMvc.perform(get("/api/entreprises"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));

        // Verify
        verify(entreprisesService, times(1)).getAllEntreprises();
        System.out.println("Vérification: getAllEntreprises appelé 1 fois");
        System.out.println("TEST 3 RÉUSSI: Liste vide gérée correctement");
    }

    // CAS 4: SUPPRESSION D'ENTREPRISE
    @Test
    void testDeleteEntreprise_Success() throws Exception {
        System.out.println("TEST 4: Suppression d'entreprise - Succès");

        // Given
        doNothing().when(entreprisesService).deleteEntreprise(1L);
        System.out.println("Mock configuré: deleteEntreprise ne fait rien (succès)");

        // When & Then
        System.out.println("Exécution DELETE /api/entreprises/1");
        mockMvc.perform(delete("/api/entreprises/1"))
                .andExpect(status().isOk());

        // Verify
        verify(entreprisesService, times(1)).deleteEntreprise(1L);
        System.out.println("Vérification: deleteEntreprise appelé avec ID=1");
        System.out.println("TEST 4 RÉUSSI: Suppression entreprise fonctionne");
    }

    // CAS 5: SUPPRESSION D'ENTREPRISE AVEC ID INVALIDE
    @Test
    void testDeleteEntreprise_InvalidId() throws Exception {
        System.out.println("TEST 5: Suppression entreprise - ID invalide");

        // Given
        doThrow(new IllegalArgumentException("Invalid ID")).when(entreprisesService).deleteEntreprise(-1L);
        System.out.println("Mock configuré: deleteEntreprise avec ID=-1 lance exception");

        // When & Then
        System.out.println("Exécution DELETE /api/entreprises/-1");
        mockMvc.perform(delete("/api/entreprises/-1"))
                .andExpect(status().isBadRequest());

        // Verify
        verify(entreprisesService, times(1)).deleteEntreprise(-1L);
        System.out.println("Vérification: deleteEntreprise appelé avec ID=-1");
        System.out.println("TEST 5 RÉUSSI: Gestion ID invalide fonctionne");
    }

    // CAS 6: MISE À JOUR D'ENTREPRISE
    @Test
    void testUpdateEntreprise_Success() throws Exception {
        System.out.println("TEST 6: Mise à jour d'entreprise - Succès");

        // Given
        doNothing().when(entreprisesService).updateEntreprise(eq(1L), any(Entreprise.class));
        System.out.println("Mock configuré: updateEntreprise ne fait rien (succès)");

        // When & Then
        System.out.println("Exécution PUT /api/entreprises/1");
        mockMvc.perform(put("/api/entreprises/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(mockEntreprise)))
                .andExpect(status().isOk());

        // Verify
        verify(entreprisesService, times(1)).updateEntreprise(eq(1L), any(Entreprise.class));
        System.out.println("Vérification: updateEntreprise appelé avec ID=1");
        System.out.println("TEST 6 RÉUSSI: Mise à jour entreprise fonctionne");
    }

    // CAS 7: VÉRIFICATION EXISTENCE ENTREPRISE - EXISTE
    @Test
    void testCheckEntrepriseExistence_Exists() throws Exception {
        System.out.println("TEST 7: Vérification existence entreprise - Existe");

        // Given
        Entreprise checkRequest = new Entreprise();
        checkRequest.setNom("Google");
        checkRequest.setAdresse("Silicon Valley");
        checkRequest.setEmail("contact@google.com");

        when(entreprisesService.checkIfEntrepriseExists("Google", "Silicon Valley", "contact@google.com"))
                .thenReturn(Optional.of(mockEntreprise));
        System.out.println("Mock configuré: checkIfEntrepriseExists retourne entreprise existante");

        // When & Then
        System.out.println("Exécution POST /api/entreprises/check-existence");
        mockMvc.perform(post("/api/entreprises/check-existence")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(checkRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.exists").value(true))
                .andExpect(jsonPath("$.entreprise.nom").value("Google"));

        // Verify
        verify(entreprisesService, times(1))
                .checkIfEntrepriseExists("Google", "Silicon Valley", "contact@google.com");
        System.out.println("Vérification: checkIfEntrepriseExists appelé avec bons paramètres");
        System.out.println("TEST 7 RÉUSSI: Détection entreprise existante fonctionne");
    }

    // CAS 8: VÉRIFICATION EXISTENCE ENTREPRISE - N'EXISTE PAS
    @Test
    void testCheckEntrepriseExistence_NotExists() throws Exception {
        System.out.println("TEST 8: Vérification existence entreprise - N'existe pas");

        // Given
        Entreprise checkRequest = new Entreprise();
        checkRequest.setNom("Nouvelle Entreprise");
        checkRequest.setAdresse("Nouvelle Adresse");
        checkRequest.setEmail("nouveau@email.com");

        when(entreprisesService.checkIfEntrepriseExists("Nouvelle Entreprise", "Nouvelle Adresse", "nouveau@email.com"))
                .thenReturn(Optional.empty());
        System.out.println("Mock configuré: checkIfEntrepriseExists retourne Optional vide");

        // When & Then
        System.out.println("Exécution POST /api/entreprises/check-existence");
        mockMvc.perform(post("/api/entreprises/check-existence")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(checkRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.exists").value(false));

        // Verify
        verify(entreprisesService, times(1))
                .checkIfEntrepriseExists("Nouvelle Entreprise", "Nouvelle Adresse", "nouveau@email.com");
        System.out.println("Vérification: checkIfEntrepriseExists appelé avec bons paramètres");
        System.out.println("TEST 8 RÉUSSI: Détection entreprise inexistante fonctionne");
    }

    // CAS 9: VÉRIFICATION EXISTENCE AVEC CHAMPS MANQUANTS
    @Test
    void testCheckEntrepriseExistence_MissingFields() throws Exception {
        System.out.println("TEST 9: Vérification existence - Champs manquants");

        // Given
        Entreprise checkRequest = new Entreprise();
        checkRequest.setNom("Google");
        // Adresse et email manquants

        when(entreprisesService.checkIfEntrepriseExists("Google", null, null))
                .thenReturn(Optional.empty());
        System.out.println("Mock configuré: checkIfEntrepriseExists avec champs null");

        // When & Then
        System.out.println("Exécution POST /api/entreprises/check-existence avec champs manquants");
        mockMvc.perform(post("/api/entreprises/check-existence")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(checkRequest)))
                .andExpect(status().isOk());

        // Verify
        verify(entreprisesService, times(1))
                .checkIfEntrepriseExists("Google", null, null);
        System.out.println("Vérification: checkIfEntrepriseExists appelé avec champs null");
        System.out.println("TEST 9 RÉUSSI: Gestion champs manquants fonctionne");
    }

    // CAS 10: CRÉATION D'ENTREPRISE AVEC DONNÉES INVALIDES
    @Test
    void testCreateEntreprise_InvalidData() throws Exception {
        System.out.println("TEST 10: Création entreprise - Données invalides");

        // Given
        Entreprise invalidEntreprise = new Entreprise();
        // Données manquantes ou invalides

        when(entreprisesService.addEntreprise(any(Entreprise.class)))
                .thenThrow(new IllegalArgumentException("Invalid enterprise data"));
        System.out.println("Mock configuré: addEntreprise lance exception pour données invalides");

        // When & Then
        System.out.println("Exécution POST /api/entreprises avec données invalides");
        mockMvc.perform(post("/api/entreprises")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidEntreprise)))
                .andExpect(status().isBadRequest());

        // Verify
        verify(entreprisesService, times(1)).addEntreprise(any(Entreprise.class));
        System.out.println("Vérification: addEntreprise appelé malgré données invalides");
        System.out.println("TEST 10 RÉUSSI: Gestion données invalides fonctionne");
    }
}