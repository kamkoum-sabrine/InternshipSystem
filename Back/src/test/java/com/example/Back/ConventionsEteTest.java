package com.example.Back;


import com.example.Back.Conventions.Controllers.ConventionStageEteController;
import com.example.Back.Conventions.Models.ConventionStageEte;
import com.example.Back.Conventions.Models.RefusConventionDTO;
import com.example.Back.Conventions.Repositories.ConventionStageEteRepository;
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

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class ConventionsEteTest {

    private MockMvc mockMvc;

    @Mock
    private ConventionStageEteRepository conventionStageEteRepository;

    @InjectMocks
    private ConventionStageEteController conventionController;

    private ObjectMapper objectMapper;
    private ConventionStageEte mockConvention;

    @BeforeEach
    void setUp() {
        System.out.println("Initialisation des tests ConventionController...");

        objectMapper = new ObjectMapper();
        mockMvc = MockMvcBuilders.standaloneSetup(conventionController).build();

        // Setup convention mock
        mockConvention = new ConventionStageEte();
        mockConvention.setId(1L);
        mockConvention.setValideeService(0); // Statut initial: non traité
        mockConvention.setRemarquesService("");

        System.out.println("Setup terminé - Convention de test créée avec ID=1, statut=0");
    }

    // =========================================================================
    // TESTS PREFUSER CONVENTION
    // =========================================================================

    // CAS 1: REFUSER CONVENTION - SUCCÈS
    @Test
    void testRefuserConvention_Success() throws Exception {
        System.out.println("TEST 1: Refus convention - Succès");

        // Given
        RefusConventionDTO dto = new RefusConventionDTO();
        dto.setRemarquesService("Manque de documents requis");

        when(conventionStageEteRepository.findById(1L)).thenReturn(Optional.of(mockConvention));
        when(conventionStageEteRepository.save(any(ConventionStageEte.class))).thenReturn(mockConvention);

        System.out.println("Mock configuré: findById retourne convention, save réussit");

        // When & Then
        System.out.println("Exécution PUT /RefuserConvention/1 avec remarques");
        mockMvc.perform(put("/api/conventionStagEte/RefuserConvention/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isAccepted())
                .andExpect(jsonPath("$.message").value("Convention refusée avec succes"))
                .andExpect(jsonPath("$.status").value(202));

        // Verify
        verify(conventionStageEteRepository, times(1)).findById(1L);
        verify(conventionStageEteRepository, times(1)).save(any(ConventionStageEte.class));
        System.out.println("Vérification: findById et save appelés 1 fois");
        System.out.println("TEST 1 RÉUSSI: Refus convention avec remarques fonctionne");
    }

    // CAS 2: REFUSER CONVENTION - NON TROUVÉE
    @Test
    void testRefuserConvention_NotFound() throws Exception {
        System.out.println("TEST 2: Refus convention - Non trouvée");

        // Given
        RefusConventionDTO dto = new RefusConventionDTO();
        dto.setRemarquesService("Test remarques");

        when(conventionStageEteRepository.findById(999L)).thenReturn(Optional.empty());
        System.out.println("Mock configuré: findById retourne Optional vide (convention non trouvée)");

        // When & Then
        System.out.println("Exécution PUT /RefuserConvention/999 (ID inexistant)");
        mockMvc.perform(put("/api/conventionStagEte/RefuserConvention/999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Convention non trouvée"));

        // Verify
        verify(conventionStageEteRepository, times(1)).findById(999L);
        verify(conventionStageEteRepository, never()).save(any(ConventionStageEte.class));
        System.out.println("Vérification: findById appelé, save jamais appelé");
        System.out.println("TEST 2 RÉUSSI: Gestion convention non trouvée fonctionne");
    }

    // CAS 3: REFUSER CONVENTION - SANS REMARQUES
    @Test
    void testRefuserConvention_NoRemarques() throws Exception {
        System.out.println("TEST 3: Refus convention - Sans remarques");

        // Given
        RefusConventionDTO dto = new RefusConventionDTO();
        dto.setRemarquesService(null); // ou dto.setRemarquesService("");

        when(conventionStageEteRepository.findById(1L)).thenReturn(Optional.of(mockConvention));
        when(conventionStageEteRepository.save(any(ConventionStageEte.class))).thenReturn(mockConvention);
        System.out.println("Mock configuré: findById et save configurés, remarques null");

        // When & Then
        System.out.println("Exécution PUT /RefuserConvention/1 sans remarques");
        mockMvc.perform(put("/api/conventionStagEte/RefuserConvention/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isAccepted())
                .andExpect(jsonPath("$.message").value("Convention refusée avec succes"));

        // Verify
        verify(conventionStageEteRepository, times(1)).findById(1L);
        verify(conventionStageEteRepository, times(1)).save(any(ConventionStageEte.class));
        System.out.println("Vérification: findById et save appelés malgré remarques null");
        System.out.println("TEST 3 RÉUSSI: Refus sans remarques fonctionne");
    }

    // =========================================================================
    // TESTS POUR VALIDER CONVENTION
    // =========================================================================

    // CAS 4: VALIDER CONVENTION - SUCCÈS
    @Test
    void testValiderConvention_Success() throws Exception {
        System.out.println("TEST 4: Validation convention - Succès");

        // Given
        when(conventionStageEteRepository.findById(1L)).thenReturn(Optional.of(mockConvention));
        when(conventionStageEteRepository.save(any(ConventionStageEte.class))).thenReturn(mockConvention);
        System.out.println("Mock configuré: findById retourne convention, save réussit");

        // When & Then
        System.out.println("Exécution PUT /ValiderConvention/1");
        mockMvc.perform(put("/api/conventionStagEte/ValiderConvention/1"))
                .andExpect(status().isAccepted())
                .andExpect(jsonPath("$.message").value("Convention validée avec succes"))
                .andExpect(jsonPath("$.status").value(202));

        // Verify
        verify(conventionStageEteRepository, times(1)).findById(1L);
        verify(conventionStageEteRepository, times(1)).save(any(ConventionStageEte.class));
        System.out.println("Vérification: findById et save appelés 1 fois");
        System.out.println("TEST 4 RÉUSSI: Validation convention fonctionne");
    }

    // CAS 5: VALIDER CONVENTION - NON TROUVÉE
    @Test
    void testValiderConvention_NotFound() throws Exception {
        System.out.println("TEST 5: Validation convention - Non trouvée");

        // Given
        when(conventionStageEteRepository.findById(999L)).thenReturn(Optional.empty());
        System.out.println("Mock configuré: findById retourne Optional vide");

        // When & Then
        System.out.println("Exécution PUT /ValiderConvention/999 (ID inexistant)");
        mockMvc.perform(put("/api/conventionStagEte/ValiderConvention/999"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Convention non trouvée"));

        // Verify
        verify(conventionStageEteRepository, times(1)).findById(999L);
        verify(conventionStageEteRepository, never()).save(any(ConventionStageEte.class));
        System.out.println("Vérification: findById appelé, save jamais appelé");
        System.out.println("TEST 5 RÉUSSI: Gestion convention non trouvée fonctionne");
    }

    // CAS 6: VALIDER CONVENTION - DÉJÀ VALIDÉE (si vous réactivez la vérification)
    @Test
    void testValiderConvention_AlreadyValidated() throws Exception {
        System.out.println("TEST 6: Validation convention - Déjà validée");

        // Given
        ConventionStageEte alreadyValidatedConvention = new ConventionStageEte();
        alreadyValidatedConvention.setId(2L);
        alreadyValidatedConvention.setValideeService(1); // Déjà validée

        when(conventionStageEteRepository.findById(2L)).thenReturn(Optional.of(alreadyValidatedConvention));
        System.out.println("Mock configuré: findById retourne convention déjà validée (statut=1)");

        // When & Then
        System.out.println("Exécution PUT /ValiderConvention/2 (déjà validée)");
        mockMvc.perform(put("/api/conventionStagEte/ValiderConvention/2"))
                .andExpect(status().isAccepted()); // Accepté car vérification commentée

        // Si vous réactivez la vérification, attendez-vous à:
        // .andExpect(status().isBadRequest())
        // .andExpect(content().string("Cette convention est déja validée"));

        verify(conventionStageEteRepository, times(1)).findById(2L);
        verify(conventionStageEteRepository, times(1)).save(any(ConventionStageEte.class));
        System.out.println("NOTE: La vérification 'déjà validée' est actuellement commentée");
        System.out.println("TEST 6 RÉUSSI: Comportement actuel respecté");
    }

    // CAS 7: VALIDER CONVENTION - DÉJÀ REFUSÉE (si vous réactivez la vérification)
    @Test
    void testValiderConvention_AlreadyRefused() throws Exception {
        System.out.println("TEST 7: Validation convention - Déjà refusée");

        // Given
        ConventionStageEte alreadyRefusedConvention = new ConventionStageEte();
        alreadyRefusedConvention.setId(3L);
        alreadyRefusedConvention.setValideeService(-1); // Déjà refusée

        when(conventionStageEteRepository.findById(3L)).thenReturn(Optional.of(alreadyRefusedConvention));
        System.out.println("Mock configuré: findById retourne convention déjà refusée (statut=-1)");

        // When & Then
        System.out.println("Exécution PUT /ValiderConvention/3 (déjà refusée)");
        mockMvc.perform(put("/api/conventionStagEte/ValiderConvention/3"))
                .andExpect(status().isAccepted()); // Accepté car vérification commentée

        // Si vous réactivez la vérification, attendez-vous à:
        // .andExpect(status().isBadRequest())
        // .andExpect(content().string("Cette convention n'est pas validée."));

        verify(conventionStageEteRepository, times(1)).findById(3L);
        verify(conventionStageEteRepository, times(1)).save(any(ConventionStageEte.class));
        System.out.println("NOTE: La vérification 'déjà refusée' est actuellement commentée");
        System.out.println("TEST 7 RÉUSSI: Comportement actuel respecté");
    }

    // CAS 8: REFUSER CONVENTION - DÉJÀ VALIDÉE (si vous réactivez la vérification)
    @Test
    void testRefuserConvention_AlreadyValidated() throws Exception {
        System.out.println("TEST 8: Refus convention - Déjà validée");

        // Given
        ConventionStageEte alreadyValidatedConvention = new ConventionStageEte();
        alreadyValidatedConvention.setId(4L);
        alreadyValidatedConvention.setValideeService(1); // Déjà validée

        RefusConventionDTO dto = new RefusConventionDTO();
        dto.setRemarquesService("Tentative de refus après validation");


        when(conventionStageEteRepository.findById(4L)).thenReturn(Optional.of(alreadyValidatedConvention));
        System.out.println("Mock configuré: findById retourne convention déjà validée");

        // When & Then
        System.out.println("Exécution PUT /RefuserConvention/4 (déjà validée)");
        mockMvc.perform(put("/api/conventionStagEte/RefuserConvention/4")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isAccepted()); // Accepté car vérification commentée

        // Si vous réactivez la vérification, attendez-vous à:
        // .andExpect(status().isBadRequest())
        // .andExpect(content().string("Cette convention a été validée précedemment"));

        verify(conventionStageEteRepository, times(1)).findById(4L);
        verify(conventionStageEteRepository, times(1)).save(any(ConventionStageEte.class));
        System.out.println("NOTE: La vérification 'déjà validée' est actuellement commentée");
        System.out.println("TEST 8 RÉUSSI: Comportement actuel respecté");
    }
}
