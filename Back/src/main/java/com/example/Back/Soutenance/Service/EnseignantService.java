package com.example.Back.Soutenance.Service;

import com.example.Back.Soutenance.Model.Enseignant;
import com.example.Back.Soutenance.Repository.EnseignantRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnseignantService {

    private EnseignantRepository enseignantRepository;

    @Autowired
    public EnseignantService(EnseignantRepository enseignantRepository) {
        this.enseignantRepository = enseignantRepository;
    }

    public List<Enseignant> getEnseignants() {
        return enseignantRepository.findAll();
    }

    public Enseignant addEnseignant(Enseignant enseignant) {
        // Valider les champs obligatoires
        if (enseignant.getNom() == null || enseignant.getPrenom() == null || enseignant.getEmail() == null ) {
            throw new IllegalArgumentException("Les champs obligatoires (Nom, Prenom, Email) ne doivent pas être nuls");
        }
        // Sauvegarder et retourner l'entité
        return enseignantRepository.save(enseignant);
    }

    public void deleteEnseignant(Long id) {
        Enseignant enseignant = enseignantRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("L'enseignant n'existe pas"));
        enseignantRepository.deleteById(id);
    }

    @Transactional
    public Enseignant editEnseignant(Long id, String nom, String prenom, String email) {
        Enseignant enseignant = enseignantRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("L'enseignant n'existe pas"));

        // Mettre à jour les champs si fournis
        if (nom != null && !nom.trim().isEmpty() && !nom.equals(enseignant.getNom())) {
            enseignant.setNom(nom);
        }

        if (prenom != null && !prenom.trim().isEmpty() && !prenom.equals(enseignant.getPrenom())) {
            enseignant.setPrenom(prenom);
        }

        if (email != null && !email.trim().isEmpty() && !email.equals(enseignant.getEmail())) {
            enseignant.setEmail(email);
        }



        // Sauvegarder et retourner l'entité mise à jour
        return enseignantRepository.save(enseignant);
    }
}
