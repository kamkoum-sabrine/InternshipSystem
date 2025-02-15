package com.example.Back.Soutenance.Service;

import com.example.Back.Soutenance.Model.Soutenance;
import com.example.Back.Soutenance.Repository.SoutenanceRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class SoutenanceService {

    private final SoutenanceRepository soutenanceRepository;

    @Autowired
    public SoutenanceService(SoutenanceRepository soutenanceRepository) {
        this.soutenanceRepository = soutenanceRepository;
    }

    @Transactional
    public List<Soutenance> getAllSoutenances() {
        return soutenanceRepository.findAll();
    }

    @Transactional
    public Soutenance addSoutenance(Soutenance soutenance) {
        // Valider les champs obligatoires
        if (soutenance.getDate() == null || soutenance.getHeure() == null || soutenance.getSalle() <= 0 ||
                soutenance.getEtudiantId() == null || soutenance.getEncadrantId() == null) {
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
    public Soutenance editSoutenance(Long id, LocalDate date, Integer salle, LocalTime heure, Long etudiantId, Long encadrantId,List<String> jury, String sujet) {
        Soutenance soutenance = soutenanceRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("La soutenance n'existe pas"));

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

        if (encadrantId != null && encadrantId > 0 && !encadrantId.equals(soutenance.getEncadrantId())) {
            soutenance.setEncadrantId(encadrantId);
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
}