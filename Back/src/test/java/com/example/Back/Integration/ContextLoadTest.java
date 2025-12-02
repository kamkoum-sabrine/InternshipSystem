/*package com.example.Back.Integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@TestPropertySource(locations = "classpath:application-test.properties")
public class ContextLoadTest {

    @Autowired(required = false)
    private ApplicationContext applicationContext;

    @Autowired(required = false)
    private MockMvc mockMvc;

    @Autowired(required = false)
    private ObjectMapper objectMapper;

    @Test
    void contextLoads() {
        assertNotNull(applicationContext, "Spring context should be loaded");
        assertNotNull(mockMvc, "MockMvc should be loaded");
        assertNotNull(objectMapper, "ObjectMapper should be loaded");
        System.out.println("✅ Spring context loaded successfully!");
    }

    @Test
    void testBasicEndpoint() throws Exception {
        // Test un endpoint basique sans sécurité
        mockMvc.perform(get("/actuator/health").contentType("application/json"))
                .andExpect(status().isOk());
    }
}*/