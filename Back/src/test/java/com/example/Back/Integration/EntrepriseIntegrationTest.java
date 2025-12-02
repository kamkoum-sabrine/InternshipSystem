/*
package com.example.Back.Integration;

import com.example.Back.Entreprises.Models.Entreprise;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

@DisplayName("Tests d'intégration - Gestion Entreprises")
public class EntrepriseIntegrationTest extends BaseIntegrationTest {

    @Test
    @DisplayName("US-06 : GET /api/entreprises - Liste des entreprises (Accès public)")
    public void testGetAllEntreprises() throws Exception {
        mockMvc.perform(get("/api/entreprises")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", isA(java.util.List.class)));
    }

    @Test
    @DisplayName("US-02 : POST /api/entreprises - Création entreprise")
    public void testCreateEntreprise() throws Exception {
        // Préparer les données
        Entreprise entreprise = new Entreprise();
        entreprise.setNom("TechCorp Tunisia");
        entreprise.setAdresse("Avenue Habib Bourguiba, Tunis");
        entreprise.setEmail("contact@techcorp.tn");
        entreprise.setTelephone(71234567L);
        entreprise.setDomaineActivites("Informatique");

        // Créer l'entreprise
        MvcResult result = mockMvc.perform(post("/api/entreprises")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(entreprise)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.nom").value("TechCorp Tunisia"))
                .andExpect(jsonPath("$.email").value("contact@techcorp.tn"))
                .andReturn();

        // Extraire l'ID créé
        String responseJson = result.getResponse().getContentAsString();
        Long entrepriseId = objectMapper.readTree(responseJson).get("id").asLong();

        // Vérifier que l'entreprise existe bien en base
        mockMvc.perform(get("/api/entreprises/" + entrepriseId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nom").value("TechCorp Tunisia"));
    }

    @Test
    @DisplayName("US-03 : PUT /api/entreprises/{id} - Modification entreprise")
    public void testUpdateEntreprise() throws Exception {
        // 1. Créer une entreprise
        Long entrepriseId = createTestEntreprise();

        // 2. Modifier l'entreprise
        Entreprise entrepriseUpdate = new Entreprise();
        entrepriseUpdate.setNom("TechCorp Updated");
        entrepriseUpdate.setAdresse("Nouvelle adresse");
        entrepriseUpdate.setEmail("updated@techcorp.tn");
        entrepriseUpdate.setTelephone(71999999L);
        entrepriseUpdate.setDomaineActivites("IT Updated");

        mockMvc.perform(put("/api/entreprises/" + entrepriseId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(entrepriseUpdate)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nom").value("TechCorp Updated"))
                .andExpect(jsonPath("$.email").value("updated@techcorp.tn"));

        // 3. Vérifier la modification en base
        mockMvc.perform(get("/api/entreprises/" + entrepriseId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nom").value("TechCorp Updated"));
    }

    @Test
    @DisplayName("US-04 : DELETE /api/entreprises/{id} - Suppression entreprise")
    public void testDeleteEntreprise() throws Exception {
        // 1. Créer une entreprise
        Long entrepriseId = createTestEntreprise();

        // 2. Supprimer
        mockMvc.perform(delete("/api/entreprises/" + entrepriseId))
                .andExpect(status().isNoContent());

        // 3. Vérifier suppression
        mockMvc.perform(get("/api/entreprises/" + entrepriseId))
                .andExpect(status().isNotFound());
    }

    // Méthode helper pour créer une entreprise de test
    private Long createTestEntreprise() throws Exception {
        Entreprise entreprise = new Entreprise();
        entreprise.setNom("Test Corporation");
        entreprise.setAdresse("Test Address");
        entreprise.setEmail("test" + System.currentTimeMillis() + "@test.tn");
        entreprise.setTelephone(71000000L);
        entreprise.setDomaineActivites("IT");

        MvcResult result = mockMvc.perform(post("/api/entreprises")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(entreprise)))
                .andExpect(status().isCreated())
                .andReturn();

        return objectMapper.readTree(result.getResponse().getContentAsString())
                .get("id").asLong();
    }
}*/
