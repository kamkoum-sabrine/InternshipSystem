package com.example.Back;

import com.example.Back.Auth.Controllers.AuthController;
import com.example.Back.Auth.Models.AuthRequest;
import com.example.Back.Auth.Models.Role;
import com.example.Back.Auth.Models.User;
import com.example.Back.Auth.Repositories.UserRepository;
import com.example.Back.Auth.Config.JwtUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class AuthControllerLoginTest {

    private MockMvc mockMvc;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthController authController;

    private ObjectMapper objectMapper;
    private AuthRequest validAuthRequest;
    private User mockUser;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        mockMvc = MockMvcBuilders.standaloneSetup(authController).build();

        validAuthRequest = new AuthRequest();
        validAuthRequest.setEmail("etudiant@enicar.tn");
        validAuthRequest.setPassword("password123");

        mockUser = new User();
        mockUser.setId(1L);
        mockUser.setNom("Dupont");
        mockUser.setPrenom("Jean");
        mockUser.setEmail("etudiant@enicar.tn");

        Role studentRole = new Role();
        studentRole.setNom("STUDENT");
        mockUser.setRole(studentRole);
    }

    // CAS 1: LOGIN RÉUSSI
    @Test
    void testLogin_Success() throws Exception {
        // Given
        Authentication mockAuthentication = mock(Authentication.class);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(mockAuthentication);

        when(jwtUtil.generateToken("etudiant@enicar.tn")).thenReturn("jwt-token-123");
        when(userRepository.findUserByEmail("etudiant@enicar.tn")).thenReturn(Optional.of(mockUser));

        // When & Then
        mockMvc.perform(post("/api/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validAuthRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("jwt-token-123"))
                .andExpect(jsonPath("$.user.email").value("etudiant@enicar.tn"));

        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(jwtUtil).generateToken("etudiant@enicar.tn");
        verify(userRepository).findUserByEmail("etudiant@enicar.tn");
    }

    // CAS 2: CREDENTIALS INVALIDES
    @Test
    void testLogin_InvalidCredentials() throws Exception {
        // Given
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException("Bad credentials"));

        // When & Then
        mockMvc.perform(post("/api/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validAuthRequest)))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string("Invalid credentials"));

        verify(jwtUtil, never()).generateToken(anyString());
        verify(userRepository, never()).findUserByEmail(anyString());
    }

    // CAS 3: UTILISATEUR NON TROUVÉ APRÈS AUTH RÉUSSIE
    @Test
    void testLogin_UserNotFoundAfterSuccessfulAuth() throws Exception {
        // Given
        Authentication mockAuthentication = mock(Authentication.class);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(mockAuthentication);

        when(jwtUtil.generateToken("etudiant@enicar.tn")).thenReturn("jwt-token-123");
        when(userRepository.findUserByEmail("etudiant@enicar.tn")).thenReturn(Optional.empty());

        // When & Then - Maintenant ça devrait retourner 404 au lieu de 500
        mockMvc.perform(post("/api/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validAuthRequest)))
                .andExpect(status().isNotFound())
                .andExpect(content().string("User not found"));

        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(jwtUtil).generateToken("etudiant@enicar.tn");
    }


}