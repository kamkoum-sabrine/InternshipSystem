package com.example.Back.Soutenance.Service;

import com.example.Back.Soutenance.Model.Enseignant;
import com.example.Back.Soutenance.Model.Soutenance;
import com.example.Back.Soutenance.Repository.EnseignantRepository;
import com.example.Back.Soutenance.Repository.SoutenanceRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Email;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Pattern;

@Service
public class EnseignantService {

    private static final Logger logger = LogManager.getLogger(EnseignantService.class);

    private final EnseignantRepository enseignantRepository;
    private final SoutenanceRepository soutenanceRepository;

    @Autowired
    public EnseignantService(EnseignantRepository enseignantRepository, SoutenanceRepository soutenanceRepository) {
        this.enseignantRepository = enseignantRepository;
        this.soutenanceRepository = soutenanceRepository;
    }

    public List<Enseignant> getEnseignants() {
        logger.info("Récupération de tous les enseignants");
        return enseignantRepository.findAll();
    }

    public Enseignant getEnseignantsById(Long id) {
        logger.info("Recherche de l'enseignant avec l'id {}", id);
        return enseignantRepository.findEnseignantById(id);
    }

    public Enseignant addEnseignant(Enseignant enseignant) {
        logger.info("Tentative d'ajout d'un enseignant : {}", enseignant);

        if (enseignant.getNom() == null || enseignant.getNom().trim().isEmpty() ||
                enseignant.getPrenom() == null || enseignant.getPrenom().trim().isEmpty() ||
                enseignant.getEmail() == null || enseignant.getEmail().trim().isEmpty()) {
            logger.error("Échec d'ajout : champs obligatoires manquants");
            throw new IllegalArgumentException("Tous les champs sont obligatoires !");
        }

        if (enseignant.getNom().trim().length() < 2) {
            logger.warn("Nom trop court : {}", enseignant.getNom());
            throw new IllegalArgumentException("Le nom doit contenir au moins 2 caractères !");
        }
        if (enseignant.getPrenom().trim().length() < 2) {
            logger.warn("Prénom trop court : {}", enseignant.getPrenom());
            throw new IllegalArgumentException("Le prenom doit contenir au moins 2 caractères !");
        }

        String emailRegex = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
        if (!Pattern.matches(emailRegex, enseignant.getEmail())) {
            logger.warn("Format d'email invalide : {}", enseignant.getEmail());
            throw new IllegalArgumentException("L'email doit être au format valide (example@domaine.com) !");
        }

        logger.info("Enregistrement de l'enseignant {}", enseignant.getEmail());
        return enseignantRepository.save(enseignant);
    }

    public void deleteEnseignant(Long id) {
        logger.info("Suppression de l'enseignant avec l'id {}", id);
        Enseignant enseignant = enseignantRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Enseignant non trouvé pour suppression, id={}", id);
                    return new IllegalStateException("L'enseignant n'existe pas");
                });

        boolean enseignantEncadrant = soutenanceRepository.findSoutenanceByEncadrant(enseignant).isEmpty();
        boolean enseignantJury = soutenanceRepository.findSoutenanceByEncadrant(enseignant).isEmpty();

        if (!enseignantEncadrant) {
            logger.warn("Suppression bloquée : enseignant est encadrant d'une soutenance");
            throw new IllegalStateException("L'enseignant est un encadrant d'une soutenance");
        }

        if (!enseignantJury) {
            logger.warn("Suppression bloquée : enseignant est jury d'une soutenance");
            throw new IllegalStateException("L'enseignant est l'un des jury d'une soutenance");
        }

        enseignantRepository.deleteById(id);
        logger.info("Enseignant supprimé avec succès, id={}", id);
    }

    @Transactional
    public Enseignant editEnseignant(Long id, Enseignant newenseignant) {
        logger.info("Mise à jour de l'enseignant avec l'id {}", id);

        Enseignant enseignant = enseignantRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Enseignant introuvable pour modification, id={}", id);
                    return new IllegalStateException("L'enseignant n'existe pas");
                });

        if (newenseignant.getNom().trim().length() < 2) {
            logger.warn("Nom trop court pour mise à jour : {}", newenseignant.getNom());
            throw new IllegalArgumentException("Le nom doit contenir au moins 2 caractères !");
        }
        if (newenseignant.getPrenom().trim().length() < 2) {
            logger.warn("Prénom trop court pour mise à jour : {}", newenseignant.getPrenom());
            throw new IllegalArgumentException("Le prenom doit contenir au moins 2 caractères !");
        }

        String emailRegex = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
        if (!Pattern.matches(emailRegex, newenseignant.getEmail())) {
            logger.warn("Email invalide pour mise à jour : {}", newenseignant.getEmail());
            throw new IllegalArgumentException("L'email doit être au format valide (example@domaine.com) !");
        }

        if (enseignantRepository.existsByEmail(newenseignant.getEmail())) {
            logger.warn("Email déjà utilisé : {}", newenseignant.getEmail());
            throw new IllegalArgumentException("Cet email est déjà utilisé par une autre entreprise !");
        }

        enseignant.setNom(newenseignant.getNom());
        enseignant.setPrenom(newenseignant.getPrenom());
        enseignant.setEmail(newenseignant.getEmail());

        logger.info("Enseignant mis à jour avec succès : {}", enseignant.getEmail());
        return enseignantRepository.save(enseignant);
    }
}
