package com.example.Back;

import com.example.Back.Auth.Models.User;
import com.example.Back.Auth.Repositories.UserRepository;
import com.example.Back.Soutenance.DTO.SoutenanceDTO;
import com.example.Back.Soutenance.Model.Enseignant;
import com.example.Back.Soutenance.Model.Soutenance;
import com.example.Back.Soutenance.Repository.EnseignantRepository;
import com.example.Back.Soutenance.Repository.SoutenanceRepository;
import com.example.Back.Soutenance.Service.SoutenanceService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class SoutenanceServiceTest {

    @Mock
    private SoutenanceRepository soutenanceRepository;

    @Mock
    private EnseignantRepository enseignantRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private SoutenanceService soutenanceService;

    @Test
    void testAddSoutenanceSuccess() {
        // Setup DTO
        SoutenanceDTO dto = new SoutenanceDTO();
        dto.setDate(LocalDate.of(2025, 6, 1));
        dto.setHeure(LocalTime.of(10, 0));
        dto.setSalle(101);
        dto.setEtudiantId(1L);
        dto.setEncadrantId(2L);
        dto.setJuryIds(List.of(3L, 4L));
        dto.setSujet("Sujet Test");

        // Setup mocks
        User etudiant = new User();
        etudiant.setId(1L);

        Enseignant encadrant = new Enseignant();
        encadrant.setId(2L);

        Enseignant jury1 = new Enseignant();
        jury1.setId(3L);

        Enseignant jury2 = new Enseignant();
        jury2.setId(4L);

        when(userRepository.findUserById(1L)).thenReturn(Optional.of(etudiant));
        when(enseignantRepository.findById(2L)).thenReturn(Optional.of(encadrant));
        when(enseignantRepository.findById(3L)).thenReturn(Optional.of(jury1));
        when(enseignantRepository.findById(4L)).thenReturn(Optional.of(jury2));

        // Pas de conflits
        when(soutenanceRepository.rechercherSoutenances(
                anyLong(), anyLong(), any(LocalDate.class), any(LocalTime.class), anyInt()))
                .thenReturn(Collections.emptyList());

        Soutenance saved = new Soutenance();
        saved.setId(999L);
        when(soutenanceRepository.save(any(Soutenance.class))).thenReturn(saved);

        // Test method
        Soutenance result = soutenanceService.addSoutenance(dto);

        // Verify & Assert
        assertNotNull(result);
        assertEquals(999L, result.getId());
        verify(soutenanceRepository).save(any(Soutenance.class));
    }


}
