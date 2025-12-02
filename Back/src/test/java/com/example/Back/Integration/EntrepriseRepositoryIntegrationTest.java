/*
package com.example.Back.Integration;

import com.example.Back.Entreprises.Models.Entreprise;
import com.example.Back.Entreprises.Repositories.EntreprisesRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
public class EntrepriseRepositoryIntegrationTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private EntreprisesRepository entrepriseRepository;

    @Test
    void contextLoads() {
        assertNotNull(entityManager);
        assertNotNull(entrepriseRepository);
        System.out.println("✅ Repository context loaded successfully!");
    }

    @Test
    void testSaveAndFindEntreprise() {
        // Given
        Entreprise entreprise = new Entreprise();
        entreprise.setNom("Test Company");
        entreprise.setEmail("test@company.tn");
        entreprise.setTelephone(70123456L);
        entreprise.setAdresse("Test Address");

        // When
        Entreprise saved = entrepriseRepository.save(entreprise);
        Entreprise found = entrepriseRepository.findById(saved.getId()).orElse(null);

        // Then
        assertNotNull(found);
        assertEquals("Test Company", found.getNom());
        assertEquals("test@company.tn", found.getEmail());
        System.out.println("✅ Entreprise saved and retrieved successfully!");
    }
}*/
