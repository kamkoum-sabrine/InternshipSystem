package com.example.Back.Soutenance.Service;

import com.example.Back.Auth.Models.User;
import com.example.Back.Auth.Repositories.UserRepository;
import com.example.Back.Soutenance.DTO.SoutenanceDTO;
import com.example.Back.Soutenance.Model.Enseignant;
import com.example.Back.Soutenance.Model.Soutenance;
import com.example.Back.Soutenance.Repository.EnseignantRepository;
import com.example.Back.Soutenance.Repository.SoutenanceRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class SoutenanceService {

    private final SoutenanceRepository soutenanceRepository;
    private final EnseignantRepository enseignantRepository;
    private final UserRepository userRepository;

    @Autowired
    public SoutenanceService(SoutenanceRepository soutenanceRepository, EnseignantRepository enseignantRepository, UserRepository userRepository) {
        this.soutenanceRepository = soutenanceRepository;
        this.enseignantRepository = enseignantRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Soutenance addSoutenance(SoutenanceDTO dto) {
        log.info("Ajout d'une nouvelle soutenance : {}", dto);

        if (dto.getDate() == null || dto.getHeure() == null || dto.getSalle() == 0 ||
                dto.getEtudiantId() == null || dto.getEncadrantId() == null) {
            throw new IllegalArgumentException("Tous les champs obligatoires doivent être renseignés");
        }

        Enseignant encadrant = enseignantRepository.findById(dto.getEncadrantId())
                .orElseThrow(() -> new IllegalArgumentException("Encadrant non trouvé"));

        User etudiant = userRepository.findUserById(dto.getEtudiantId())
                .orElseThrow(() -> new IllegalArgumentException("Étudiant non trouvé"));

        List<Enseignant> jury = dto.getJuryIds().stream()
                .map(id -> enseignantRepository.findById(id)
                        .orElseThrow(() -> new IllegalArgumentException("Membre du jury non trouvé: " + id)))
                .collect(Collectors.toList());

        List<String> conflicts = findConflicts(dto, null);
        if (!conflicts.isEmpty()) {
            throw new IllegalStateException("Conflits détectés:\n" + String.join("\n", conflicts));
        }

        Soutenance soutenance = new Soutenance(
                dto.getDate(), dto.getSalle(), dto.getHeure(), etudiant, encadrant, jury, dto.getSujet()
        );

        return soutenanceRepository.save(soutenance);
    }

    @Transactional
    public Soutenance editSoutenance(Long id, SoutenanceDTO dto) {
        log.info("Mise à jour de la soutenance id={} avec données : {}", id, dto);

        Soutenance soutenance = soutenanceRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("La soutenance n'existe pas"));

        List<String> conflicts = findConflicts(dto, id);
        if (!conflicts.isEmpty()) {
            throw new IllegalStateException("Des conflits ont été détectés :\n" + String.join("\n", conflicts));
        }

        if (dto.getDate() != null) soutenance.setDate(dto.getDate());
        if (dto.getHeure() != null) soutenance.setHeure(dto.getHeure());
        if (dto.getSalle() != 0) soutenance.setSalle(dto.getSalle());

        if (dto.getEtudiantId() != null) {
            User etudiant = userRepository.findUserById(dto.getEtudiantId())
                    .orElseThrow(() -> new IllegalArgumentException("Etudiant non trouvé"));
            soutenance.setEtudiant(etudiant);
        }

        if (dto.getEncadrantId() != null) {
            Enseignant encadrant = enseignantRepository.findById(dto.getEncadrantId())
                    .orElseThrow(() -> new IllegalArgumentException("Encadrant non trouvé"));
            soutenance.setEncadrant(encadrant);
        }

        if (dto.getJuryIds() != null) {
            List<Enseignant> jury = dto.getJuryIds().stream()
                    .map(Id -> enseignantRepository.findById(id)
                            .orElseThrow(() -> new IllegalArgumentException("Jury non trouvé : " + id)))
                    .collect(Collectors.toList());
            soutenance.setJury(jury);
        }

        if (dto.getSujet() != null && !dto.getSujet().trim().isEmpty()) {
            soutenance.setSujet(dto.getSujet());
        }

        return soutenanceRepository.save(soutenance);
    }

    @Transactional
    public List<Soutenance> getAllSoutenances() {
        log.info("Récupération de toutes les soutenances");
        return soutenanceRepository.findAll();
    }

    @Transactional
    public Soutenance getSoutenanceById(Long id) {
        log.info("Récupération de la soutenance par ID : {}", id);
        return soutenanceRepository.findSoutenanceById(id);
    }

    @Transactional
    public void deleteSoutenance(Long id) {
        log.info("Suppression de la soutenance ID : {}", id);
        Soutenance soutenance = soutenanceRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("La soutenance n'existe pas"));
        soutenanceRepository.deleteById(id);
    }

    private List<String> findConflicts(SoutenanceDTO dto, Long excludeId) {
        List<String> conflicts = new ArrayList<>();

        List<Soutenance> existing = soutenanceRepository.rechercherSoutenances(
                dto.getEtudiantId(), dto.getEncadrantId(), dto.getDate(), dto.getHeure(), dto.getSalle()
        );

        for (Soutenance s : existing) {
            if (excludeId != null && s.getId().equals(excludeId)) continue;

            boolean sameDateAndTime = s.getDate().equals(dto.getDate()) && s.getHeure().equals(dto.getHeure());

            if (sameDateAndTime && s.getSalle() == dto.getSalle()) {
                conflicts.add("Salle " + dto.getSalle() + " déjà réservée");
            }
            if (s.getEtudiant().getId().equals(dto.getEtudiantId()) && s.getDate().equals(dto.getDate())) {
                conflicts.add("Étudiant avec ID " + dto.getEtudiantId() + " a déjà une soutenance prévue");
            }
            if (s.getEncadrant().getId().equals(dto.getEncadrantId()) && sameDateAndTime) {
                conflicts.add("Encadrant avec ID " + dto.getEncadrantId() + " est déjà pris");
            }

            if (dto.getJuryIds() != null) {
                for (Enseignant juryMember : s.getJury()) {
                    if (dto.getJuryIds().contains(juryMember.getId()) && sameDateAndTime) {
                        conflicts.add("Membre du jury " + juryMember.getNom() + " déjà pris à cette heure");
                    }
                }
            }
        }

        return conflicts;
    }
}
