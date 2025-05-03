package com.example.Back.Soutenance.Service;

import com.example.Back.Soutenance.Model.Enseignant;
import com.example.Back.Soutenance.Model.Soutenance;
import com.example.Back.Soutenance.Repository.EnseignantRepository;
import com.example.Back.Soutenance.Repository.SoutenanceRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

@Service
public class EnseignantService {

    private final EnseignantRepository enseignantRepository;
    private final SoutenanceRepository soutenanceRepository;

    @Autowired
    public EnseignantService(EnseignantRepository enseignantRepository, SoutenanceRepository soutenanceRepository ) {
        this.enseignantRepository = enseignantRepository;
        this.soutenanceRepository = soutenanceRepository;
    }

    public List<Enseignant> getEnseignants() {
        return enseignantRepository.findAll();
    }

    public Enseignant getEnseignantsById (Long id) {
        return enseignantRepository.findEnseignantById(id);
    }

    public Enseignant addEnseignant(Enseignant enseignant) {
        // Valider les champs obligatoires

        if (enseignant.getNom() == null || enseignant.getNom().trim().isEmpty() ||
                enseignant.getPrenom() == null || enseignant.getPrenom().trim().isEmpty() ||
                enseignant.getEmail() == null || enseignant.getEmail().trim().isEmpty()
                ) {
            throw new IllegalArgumentException("Tous les champs sont obligatoires !");
        }

        if (enseignant.getNom().trim().length() < 2) {
            throw new IllegalArgumentException("Le nom doit contenir au moins 2 caractères !");
        }
        if (enseignant.getPrenom().trim().length() < 2) {
            throw new IllegalArgumentException("Le prenom doit contenir au moins 2 caractères !");
        }

        String emailRegex = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
        if (!Pattern.matches(emailRegex, enseignant.getEmail())) {
            throw new IllegalArgumentException("L'email doit être au format valide (example@domaine.com) !");
        }

        // Sauvegarder et retourner l'entité
        return enseignantRepository.save(enseignant);
    }

    public void deleteEnseignant(Long id) {
        Enseignant enseignant = enseignantRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("L'enseignant n'existe pas"));
        Boolean enseignantEncadrant = soutenanceRepository.findSoutenanceByEncadrant(enseignant).isEmpty() ;
        Boolean enseignantJury = soutenanceRepository.findSoutenanceByEncadrant(enseignant).isEmpty() ;
        if (!enseignantEncadrant) {
            throw new IllegalStateException("L'enseignant est un encadrant d'une soutenance") ;
        }

        if (!enseignantJury) {
            throw new IllegalStateException("L'enseignant est l'un des jury d'une soutenance");
        }

        enseignantRepository.deleteById(id);
    }

    @Transactional
    public Enseignant editEnseignant(Long id, Enseignant newenseignant) {
        Enseignant enseignant = enseignantRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("L'enseignant n'existe pas"));

        // Mettre à jour les champs si fournis

        if (newenseignant.getNom().trim().length() < 2) {
            throw new IllegalArgumentException("Le nom doit contenir au moins 2 caractères !");
        }
        if (newenseignant.getPrenom().trim().length() < 2) {
            throw new IllegalArgumentException("Le prenom doit contenir au moins 2 caractères !");
        }

        String emailRegex = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
        if (!Pattern.matches(emailRegex, newenseignant.getEmail())) {
            throw new IllegalArgumentException("L'email doit être au format valide (example@domaine.com) !");
        }
        if (enseignantRepository.existsByEmail(newenseignant.getEmail())) {
            throw new IllegalArgumentException("Cet email est déjà utilisé par une autre entreprise !");
        }

        enseignant.setNom(newenseignant.getNom());
        enseignant.setPrenom(newenseignant.getPrenom());
        enseignant.setEmail(newenseignant.getEmail());
        // Sauvegarder et retourner l'entité mise à jour
        return enseignantRepository.save(enseignant);
    }


}
