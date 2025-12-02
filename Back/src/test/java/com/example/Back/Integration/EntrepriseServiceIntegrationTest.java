/*
package com.example.Back.Integration;

import com.example.Back.Entreprises.Models.Entreprise;
import com.example.Back.Entreprises.Services.EntreprisesService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class EntrepriseServiceIntegrationTest {

    @Autowired
    private EntreprisesService entrepriseService;

    @Test
    void contextLoads() {
        assertNotNull(entrepriseService);
        System.out.println("✅ Service context loaded successfully!");
    }

    @Test
    void testCreateAndFindEntreprise() {
        // Given
        Entreprise entreprise = new Entreprise();
        entreprise.setNom("Service Test Company");
        entreprise.setEmail("service@test.tn");
        entreprise.setTelephone(70987654L);
        entreprise.setAdresse("Service Test Address");

        // When
        Entreprise created = entrepriseService.addEntreprise(entreprise);
        Entreprise found = entrepriseService.getEntrepriseById(created.getId());

        // Then
        assertNotNull(found);
        assertEquals("Service Test Company", found.getNom());
        System.out.println("✅ Entreprise service test passed!");
    }
}*/
