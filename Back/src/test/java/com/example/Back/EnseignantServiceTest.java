package com.example.Back;

import com.example.Back.Soutenance.Model.Enseignant;
import com.example.Back.Soutenance.Repository.EnseignantRepository;
import com.example.Back.Soutenance.Repository.SoutenanceRepository;
import com.example.Back.Soutenance.Service.EnseignantService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


// AJOUTER cette annotation
@ExtendWith(MockitoExtension.class)
class EnseignantServiceTest {


    @Mock
    private EnseignantRepository enseignantRepository;

    @Mock
    private SoutenanceRepository soutenanceRepository;

    // UTILISER @InjectMocks au lieu de construire manuellement
    @InjectMocks
    private EnseignantService enseignantService;

    @Test
    void testAddValidEnseignant() {
        // Given
        Enseignant enseignant = new Enseignant("Kamkoum", "Sabrine", "sabrinekam@enicar.ucar.tn");
        when(enseignantRepository.save(any(Enseignant.class))).thenReturn(enseignant);

        // When
        Enseignant result = enseignantService.addEnseignant(enseignant);

        // Then
        assertNotNull(result);
        assertEquals("Kamkoum", result.getNom());
        verify(enseignantRepository, times(1)).save(enseignant);
    }

/*
    @Test
    void testAddInvalidEmail() {
        // Given
        Enseignant enseignant = new Enseignant("Salhi", "Houssem", "invalid-email");

        // When & Then
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            enseignantService.addEnseignant(enseignant);
        });

        assertEquals("L'email doit être au format valide (example@enicar.ucar.tn) !", exception.getMessage());
        verify(enseignantRepository, never()).save(any());
    }
*/

    @Test
    void testAddEnseignantWithMissingFields() {
        Enseignant enseignant = new Enseignant("", "", "");

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            enseignantService.addEnseignant(enseignant);
        });

        assertEquals("Tous les champs sont obligatoires !", exception.getMessage());
    }

    @Test
    void testDeleteNonExistentEnseignant() {
        Long id = 1L;
        when(enseignantRepository.findById(id)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalStateException.class, () -> {
            enseignantService.deleteEnseignant(id);
        });

        assertEquals("L'enseignant n'existe pas", exception.getMessage());
    }



    @Test
    void testEditEnseignantValid() {
        Long id = 3L;
        Enseignant oldEnseignant = new Enseignant("Old", "Name", "old.name@enicar.ucar.tn");
        Enseignant newEnseignant = new Enseignant("New", "Name", "new.name@enicar.ucar.tn");

        when(enseignantRepository.findById(id)).thenReturn(Optional.of(oldEnseignant));
        when(enseignantRepository.existsByEmail(newEnseignant.getEmail())).thenReturn(false);
        when(enseignantRepository.save(any())).thenReturn(newEnseignant);

        Enseignant result = enseignantService.editEnseignant(id, newEnseignant);

        assertEquals("New", result.getNom());
        assertEquals("new.name@enicar.ucar.tn", result.getEmail());
        verify(enseignantRepository).save(oldEnseignant); // saved entity is still the old one with updated fields
    }

    @Test
    void testEditEnseignantInvalidEmail() {
        Long id = 4L;
        Enseignant existing = new Enseignant("Salhi", "Houssem", "salhihoussem@enicar.ucar.tn");
        Enseignant update = new Enseignant("Kamkoum", "Sabrine", "bad-email");

        when(enseignantRepository.findById(id)).thenReturn(Optional.of(existing));

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            enseignantService.editEnseignant(id, update);
        });

        assertEquals("L'email doit être au format valide (example@domaine.com) !", exception.getMessage());
    }

    @Test
    void testGetEnseignantById() {
        Long id = 5L;
        Enseignant enseignant = new Enseignant("Toumi", "Mahdi", "toumimahdi@enicar.ucar.tn");

        when(enseignantRepository.findEnseignantById(id)).thenReturn(enseignant);

        Enseignant result = enseignantService.getEnseignantsById(id);

        assertNotNull(result);
        assertEquals("Toumi", result.getNom());
    }
}
