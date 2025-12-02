/*
package com.example.Back.Integration;

import com.example.Back.Entreprises.Models.Entreprise;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class EntrepriseRestIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void contextLoads() {
        assertNotNull(restTemplate);
        System.out.println("✅ REST context loaded successfully!");
    }

    @Test
    void testGetAllEntreprises() {
        ResponseEntity<String> response = restTemplate.getForEntity("/api/entreprises", String.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        System.out.println("✅ GET /api/entreprises works!");
    }

    @Test
    void testCreateEntreprise() {
        Entreprise entreprise = new Entreprise();
        entreprise.setNom("REST Test Company");
        entreprise.setEmail("rest@test.tn");
        entreprise.setTelephone(70123456L);
        entreprise.setAdresse("REST Test Address");

        ResponseEntity<Entreprise> response = restTemplate.postForEntity(
                "/api/entreprises",
                entreprise,
                Entreprise.class
        );

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertNotNull(response.getBody().getId());
        System.out.println("✅ POST /api/entreprises works!");
    }
}*/
