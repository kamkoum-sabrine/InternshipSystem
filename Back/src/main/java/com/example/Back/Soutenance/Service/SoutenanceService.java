package com.example.Back.Soutenance.Service;

import com.example.Back.Soutenance.DTO.SoutenanceDTO;
import com.example.Back.Soutenance.Model.Enseignant;
import com.example.Back.Soutenance.Model.Soutenance;
import com.example.Back.Soutenance.Repository.EnseignantRepository;
import com.example.Back.Soutenance.Repository.SoutenanceRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SoutenanceService {

    private final SoutenanceRepository soutenanceRepository;
    private final EnseignantRepository enseignantRepository;

    @Autowired
    public SoutenanceService(SoutenanceRepository soutenanceRepository, EnseignantRepository enseignantRepository) {
        this.soutenanceRepository = soutenanceRepository;
        this.enseignantRepository = enseignantRepository;
    }

    @Transactional
    public Soutenance addSoutenance(SoutenanceDTO soutenanceDTO) {
        // Fetch the encadrant
        Enseignant encadrant = enseignantRepository.findById(soutenanceDTO.getEncadrantId())
                .orElseThrow(() -> new IllegalArgumentException("Encadrant not found with ID: " + soutenanceDTO.getEncadrantId()));

        // Fetch the jury members
        List<Enseignant> jury = soutenanceDTO.getJuryIds().stream()
                .map(id -> enseignantRepository.findById(id)
                        .orElseThrow(() -> new IllegalArgumentException("Jury member not found with ID: " + id)))
                .collect(Collectors.toList());

        // Create the Soutenance entity
        Soutenance soutenance = new Soutenance(
                soutenanceDTO.getDate(),
                soutenanceDTO.getSalle(),
                soutenanceDTO.getHeure(),
                soutenanceDTO.getEtudiantId(),
                encadrant,
                jury,
                soutenanceDTO.getSujet()
        );

        // Save the Soutenance entity
        return soutenanceRepository.save(soutenance);
    }

    @Transactional
    public List<Soutenance> getAllSoutenances() {
        return soutenanceRepository.findAll();
    }

    @Transactional
    public Soutenance addSoutenance(Soutenance soutenance) {
        // Valider les champs obligatoires
        if (soutenance.getDate() == null || soutenance.getHeure() == null || soutenance.getSalle() <= 0 ||
                soutenance.getEtudiantId() == null || soutenance.getEncadrant() == null) {
            throw new IllegalArgumentException("Les champs obligatoires (date, heure, salle, etudiantId, encadrantId) ne doivent pas être nuls");
        }
        // Sauvegarder et retourner l'entité
        return soutenanceRepository.save(soutenance);
    }

    @Transactional
    public void deleteSoutenance(Long id) {
        Soutenance soutenance = soutenanceRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("La soutenance n'existe pas"));
        soutenanceRepository.deleteById(id);
    }

    @Transactional
    public Soutenance editSoutenance(Long id, LocalDate date, Integer salle, LocalTime heure, Long etudiantId, Long encadrantId, List<Long> juryIds, String sujet) {
        Soutenance soutenance = soutenanceRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("La soutenance n'existe pas"));

        Enseignant encadrant = enseignantRepository.findById(encadrantId)
                .orElseThrow(() -> new IllegalArgumentException("Encadrant not found with ID: " + encadrantId));

        // Fetch the jury members
        List<Enseignant> jury = juryIds.stream()
                .map(Id -> enseignantRepository.findById(Id)
                        .orElseThrow(() -> new IllegalArgumentException("Jury member not found with ID: " + Id)))
                .collect(Collectors.toList());



        // Mettre à jour les champs si fournis
        if (date != null && !date.equals(soutenance.getDate())) {
            soutenance.setDate(date);
        }

        if (heure != null && !heure.equals(soutenance.getHeure())) {
            soutenance.setHeure(heure);
        }

        if (salle != null && salle > 0 && !salle.equals(soutenance.getSalle())) {
            soutenance.setSalle(salle);
        }

        if (etudiantId != null && etudiantId > 0 && !etudiantId.equals(soutenance.getEtudiantId())) {
            soutenance.setEtudiantId(etudiantId);
        }

        if (encadrant != null  && !encadrant.equals(soutenance.getEncadrant())) {
            soutenance.setEncadrant(encadrant);
        }

        if (jury != null && jury.equals(soutenance.getJury())) {
            soutenance.setJury(jury);
        }

        if (sujet != null && !sujet.trim().isEmpty() && !sujet.equals(soutenance.getSujet())) {
            soutenance.setSujet(sujet);
        }

        // Sauvegarder et retourner l'entité mise à jour
        return soutenanceRepository.save(soutenance);
    }

    public List<Soutenance> rechercherSoutenances(Long idEtudiant, Long idEncadrant, LocalDate date) {
        return soutenanceRepository.rechercherSoutenances(idEtudiant, idEncadrant, date);
    }
}