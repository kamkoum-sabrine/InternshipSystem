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
import java.util.ArrayList;
import java.util.Collections;
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
        // Validation des champs obligatoires
        if (soutenanceDTO.getDate() == null || soutenanceDTO.getHeure() == null ||
                soutenanceDTO.getSalle() == 0 || soutenanceDTO.getEtudiantId() == null ||
                soutenanceDTO.getEncadrantId() == null) {
            throw new IllegalArgumentException("Tous les champs obligatoires doivent être renseignés");
        }

        // Récupération des entités
        Enseignant encadrant = enseignantRepository.findById(soutenanceDTO.getEncadrantId())
                .orElseThrow(() -> new IllegalArgumentException("Encadrant non trouvé"));

        User etudiant = userRepository.findUserById(soutenanceDTO.getEtudiantId())
                .orElseThrow(() -> new IllegalArgumentException("Étudiant non trouvé"));

        // Récupération du jury
        List<Enseignant> jury = soutenanceDTO.getJuryIds().stream()
                .map(id -> enseignantRepository.findById(id)
                        .orElseThrow(() -> new IllegalArgumentException("Membre du jury non trouvé: " + id)))
                .collect(Collectors.toList());

        // Vérification des conflits
        List<String> conflicts = findConflictsFromAdd(soutenanceDTO, etudiant, encadrant, jury);
        if (!conflicts.isEmpty()) {
            throw new IllegalStateException("Conflits détectés:\n" + String.join("\n", conflicts));
        }

        // Création et sauvegarde
        Soutenance soutenance = new Soutenance(
                soutenanceDTO.getDate(),
                soutenanceDTO.getSalle(),
                soutenanceDTO.getHeure(),
                etudiant,
                encadrant,
                jury,
                soutenanceDTO.getSujet()
        );

        return soutenanceRepository.save(soutenance);
    }

    // Méthode pour vérifier les conflits avant l'ajout
    private List<String> findConflictsFromAdd(SoutenanceDTO soutenanceDTO, User etudiant, Enseignant encadrant, List<Enseignant> jury) {
        List<String> conflicts = new ArrayList<>();

        List<Long> juryIds = jury.stream()
                .map(Enseignant::getId)
                .collect(Collectors.toList());

        List<Soutenance> existing = soutenanceRepository.findConflicts(
                soutenanceDTO.getDate(),
                soutenanceDTO.getHeure(),
                etudiant.getId(),
                encadrant.getId(),
                juryIds,
                soutenanceDTO.getSalle(),
                null // Pas d'ID à exclure pour une nouvelle soutenance
        );

        for (Soutenance s : existing) {
            if (s.getSalle()==(soutenanceDTO.getSalle())) {
                conflicts.add("Conflit de salle: " + s.getSalle() + " déjà réservée");
            }
            if (s.getEtudiant().getId().equals(etudiant.getId())) {
                conflicts.add("Étudiant déjà en soutenance à cette heure");
            }
            if (s.getEncadrant().getId().equals(encadrant.getId())) {
                conflicts.add("Encadrant déjà occupé à cette heure");
            }
            s.getJury().stream()
                    .filter(j -> juryIds.contains(j.getId()))
                    .forEach(j -> conflicts.add("Jury " + j.getNom() + " déjà pris"));
        }

        return conflicts;
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

        // Vérifier les conflits avant l'ajout
        List<String> conflicts = findConflictsFromAdd(soutenance);
        if (!conflicts.isEmpty()) {
            throw new IllegalStateException("Conflits détectés : " + String.join(", ", conflicts));
        }

        // Sauvegarder et retourner l'entité
        return soutenanceRepository.save(soutenance);
    }

    private List<String> findConflictsFromAdd(Soutenance soutenance) {
        List<String> conflicts = new ArrayList<>();

        // Recherche des soutenances conflictuelles pour l'étudiant, l'encadrant, la salle et la date
        List<Soutenance> conflictingSoutenances = soutenanceRepository.rechercherSoutenances(
                soutenance.getEtudiant().getId(), soutenance.getEncadrant().getId(), soutenance.getDate(),soutenance.getHeure(),soutenance.getSalle());

        for (Soutenance existingSoutenance : conflictingSoutenances) {
            boolean sameDateAndTime = existingSoutenance.getDate().equals(soutenance.getDate())
                    && existingSoutenance.getHeure().equals(soutenance.getHeure());

            // Vérification des conflits sur la date et l'heure
            if (sameDateAndTime) {
                conflicts.add("Conflit sur l'heure : une soutenance est déjà prévue à " + soutenance.getHeure());
            }

            // Vérification des conflits sur la salle
            if (sameDateAndTime && existingSoutenance.getSalle() == soutenance.getSalle()) {
                conflicts.add("Conflit sur la salle : la salle " + soutenance.getSalle() + " est déjà réservée");
            }

            // Vérification des conflits avec l'étudiant
            if (existingSoutenance.getEtudiant().getId().equals(soutenance.getEtudiant().getId())
                    && existingSoutenance.getDate().equals(soutenance.getDate())) {
                conflicts.add("Conflit avec l'étudiant : l'étudiant avec l'ID " + soutenance.getEtudiant().getId() + " a déjà une soutenance prévue");
            }

            // Vérification des conflits avec l'encadrant
            if (existingSoutenance.getEncadrant().getId().equals(soutenance.getEncadrant().getId())
                    && sameDateAndTime) {
                conflicts.add("Conflit avec l'encadrant : l'encadrant avec l'ID " + soutenance.getEncadrant().getId() + " est déjà pris");
            }

            // Vérification des conflits avec les membres du jury
            for (Enseignant juryMember : existingSoutenance.getJury()) {
                for (Enseignant newJuryMember : soutenance.getJury()) {
                    if (juryMember.getId().equals(newJuryMember.getId()) && sameDateAndTime) {
                        conflicts.add("Conflit avec un membre du jury : " + juryMember.getNom() + " fait déjà partie du jury d'une soutenance à cette date/heure");
                    }
                }
            }
        }

        return conflicts;
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

    public Soutenance editSoutenance(Long id, SoutenanceDTO soutenanceDTO) {
        // Récupérer la soutenance à modifier
        Soutenance soutenance = soutenanceRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("La soutenance n'existe pas"));

        // Vérification des conflits de soutenance avant de faire la mise à jour
        List<String> conflicts = findConflicts(soutenanceDTO, id);

        if (!conflicts.isEmpty()) {
            throw new IllegalStateException("Des conflits ont été détectés :\n" + String.join("\n", conflicts));
        }

        // Fetch encadrant si fourni
        Enseignant encadrant = null;
        if (soutenanceDTO.getEncadrantId() != null) {
            encadrant = enseignantRepository.findById(soutenanceDTO.getEncadrantId())
                    .orElseThrow(() -> new IllegalArgumentException("Encadrant not found with ID: " + soutenanceDTO.getEncadrantId()));
        }

        // Fetch etudiant si fourni
        User etudiant = null;
        if (soutenanceDTO.getEtudiantId() != null) {
            etudiant = userRepository.findUserById(soutenanceDTO.getEtudiantId())
                    .orElseThrow(() -> new IllegalArgumentException("Etudiant not found with ID: " + soutenanceDTO.getEtudiantId()));
        }

        // Fetch jury si fourni
        List<Enseignant> jury = null;
        if (soutenanceDTO.getJuryIds() != null) {
            jury = soutenanceDTO.getJuryIds().stream()
                    .map(idjury -> enseignantRepository.findById(idjury)
                            .orElseThrow(() -> new IllegalArgumentException("Jury member not found with ID: " + idjury)))
                    .collect(Collectors.toList());
        }

        // Mettre à jour les champs de la soutenance
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

        // Sauvegarder et retourner la soutenance mise à jour
        return soutenanceRepository.save(soutenance);
    }

    private List<String> findConflicts(SoutenanceDTO soutenanceDTO, Long soutenanceId) {
        List<String> conflicts = new ArrayList<>();

        // Récupérer les soutenances conflictuelles pour l'étudiant, l'encadrant et la date
        List<Soutenance> conflictingSoutenances = soutenanceRepository.rechercherSoutenances(
                soutenanceDTO.getEtudiantId(), soutenanceDTO.getEncadrantId(), soutenanceDTO.getDate(),soutenanceDTO.getHeure(),soutenanceDTO.getSalle());

        // Vérifier les soutenances conflictuelles
        for (Soutenance existingSoutenance : conflictingSoutenances) {
            // Si ce n'est pas la soutenance que l'on veut modifier
            if (!existingSoutenance.getId().equals(soutenanceId)) {

                boolean sameDateAndTime = existingSoutenance.getDate().equals(soutenanceDTO.getDate())
                        && existingSoutenance.getHeure().equals(soutenanceDTO.getHeure());

                // Conflit sur l'heure
                if (sameDateAndTime) {
                    conflicts.add("Conflit sur l'heure : une soutenance est déjà prévue à " + soutenanceDTO.getHeure());
                }

                // Conflit sur la salle
                if (sameDateAndTime && existingSoutenance.getSalle() == soutenanceDTO.getSalle()) {
                    conflicts.add("Conflit sur la salle : la salle " + soutenanceDTO.getSalle() + " est déjà réservée");
                }

                // Conflit avec l'étudiant
                if (existingSoutenance.getEtudiant().getId().equals(soutenanceDTO.getEtudiantId())
                        && existingSoutenance.getDate().equals(soutenanceDTO.getDate())) {
                    conflicts.add("Conflit avec l'étudiant : l'étudiant avec l'ID " + soutenanceDTO.getEtudiantId() + " a déjà une soutenance prévue");
                }

                // Conflit avec l'encadrant
                if (existingSoutenance.getEncadrant().getId().equals(soutenanceDTO.getEncadrantId())
                        && sameDateAndTime) {
                    conflicts.add("Conflit avec l'encadrant : l'encadrant avec l'ID " + soutenanceDTO.getEncadrantId() + " est déjà pris");
                }

                // Vérifier les membres du jury
                for (Enseignant juryMember : existingSoutenance.getJury()) {
                    if (soutenanceDTO.getJuryIds().contains(juryMember.getId()) && sameDateAndTime) {
                        conflicts.add("Conflit avec un membre du jury : " + juryMember.getNom() + " fait déjà partie du jury d'une soutenance à cette date/heure");
                    }
                }
            }
        }

        return conflicts;
    }




}