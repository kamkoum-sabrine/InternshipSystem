package com.example.Back.Soutenance.Service;

import com.example.Back.Auth.Models.User;
import com.example.Back.Auth.Repositories.UserRepository;
import com.example.Back.Auth.Services.UserService;
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
    private final UserRepository userRepository;

    @Autowired
    public SoutenanceService(SoutenanceRepository soutenanceRepository, EnseignantRepository enseignantRepository, UserRepository userRepository) {
        this.soutenanceRepository = soutenanceRepository;
        this.enseignantRepository = enseignantRepository;
        this.userRepository = userRepository ;
    }

    @Transactional
    public Soutenance addSoutenance(SoutenanceDTO soutenanceDTO) {
        // Fetch the encadrant
        Enseignant encadrant = enseignantRepository.findById(soutenanceDTO.getEncadrantId())
                .orElseThrow(() -> new IllegalArgumentException("Encadrant not found with ID: " + soutenanceDTO.getEncadrantId()));

        User etudiant = userRepository.findUserById(soutenanceDTO.getEtudiantId())
                .orElseThrow(() -> new IllegalArgumentException("Etudiant not found with ID: " + soutenanceDTO.getEtudiantId()));

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
                etudiant,
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
    public Soutenance getSoutenanceById(Long id) {
        return soutenanceRepository.findSoutenanceById(id);
    }

    @Transactional
    public Soutenance addSoutenance(Soutenance soutenance) {
        // Valider les champs obligatoires
        if (soutenance.getDate() == null || soutenance.getHeure() == null || soutenance.getSalle() <= 0 ||
                soutenance.getEtudiant() == null || soutenance.getEncadrant() == null || !soutenance.getEtudiant().getRole().getNom().equals("Etudiant")) {
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

        User etudiant = userRepository.findUserById(etudiantId)
                .orElseThrow(() -> new IllegalArgumentException("Etudiant not found with ID: " + etudiantId));

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

        if (etudiant != null  && !etudiant.equals(soutenance.getEtudiant())) {
            soutenance.setEtudiant(etudiant);
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

    @Transactional
    public Soutenance editSoutenance(Long id ,SoutenanceDTO soutenanceDTO) {
        Soutenance soutenance = soutenanceRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("La soutenance n'existe pas"));

        // Fetch encadrant if provided
        Enseignant encadrant = null;
        if (soutenanceDTO.getEncadrantId() != null) {
            encadrant = enseignantRepository.findById(soutenanceDTO.getEncadrantId())
                    .orElseThrow(() -> new IllegalArgumentException("Encadrant not found with ID: " + soutenanceDTO.getEncadrantId()));
        }

        // Fetch etudiant if provided
        User etudiant = null;
        if (soutenanceDTO.getEtudiantId() != null) {
            etudiant = userRepository.findUserById(soutenanceDTO.getEtudiantId())
                    .orElseThrow(() -> new IllegalArgumentException("Etudiant not found with ID: " + soutenanceDTO.getEtudiantId()));
        }

        // Fetch the jury members if provided
        List<Enseignant> jury = null;
        if (soutenanceDTO.getJuryIds() != null) {
            jury = soutenanceDTO.getJuryIds().stream()
                    .map(idjury -> enseignantRepository.findById(idjury)
                            .orElseThrow(() -> new IllegalArgumentException("Jury member not found with ID: " + idjury)))
                    .collect(Collectors.toList());
        }

        // Mettre à jour les champs si fournis
        if (soutenanceDTO.getDate() != null) {
            soutenance.setDate(soutenanceDTO.getDate());
        }

        if (soutenanceDTO.getHeure() != null) {
            soutenance.setHeure(soutenanceDTO.getHeure());
        }

        if (soutenanceDTO.getSalle() != 0 && soutenanceDTO.getSalle() > 0) {
            soutenance.setSalle(soutenanceDTO.getSalle());
        }

        if (etudiant != null) {
            soutenance.setEtudiant(etudiant);
        }

        if (encadrant != null) {
            soutenance.setEncadrant(encadrant);
        }

        if (jury != null) {
            soutenance.setJury(jury);
        }

        if (soutenanceDTO.getSujet() != null && !soutenanceDTO.getSujet().trim().isEmpty()) {
            soutenance.setSujet(soutenanceDTO.getSujet());
        }

        // Sauvegarder et retourner l'entité mise à jour
        return soutenanceRepository.save(soutenance);
    }


    public List<Soutenance> rechercherSoutenances(Long idEtudiant, Long idEncadrant, LocalDate date) {
        return soutenanceRepository.rechercherSoutenances(idEtudiant, idEncadrant, date);
    }
}