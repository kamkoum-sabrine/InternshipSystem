package com.example.Back.Entreprises.Services;

import com.example.Back.Entreprises.Models.Entreprise;
import com.example.Back.Entreprises.Repositories.EntreprisesRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class EntreprisesService {

    private final EntreprisesRepository entrepriseRepository;

    private static final Logger logger = LogManager.getLogger(EntreprisesService.class);

    @Autowired
    public EntreprisesService(EntreprisesRepository entrepriseRepository) {
        this.entrepriseRepository = entrepriseRepository;
    }

    public Entreprise addEntreprise(Entreprise entreprise) {
        logger.info("Ajout de l'entreprise: {}", entreprise.getNom());

        if (entreprise.getNom() == null || entreprise.getNom().trim().isEmpty() ||
                entreprise.getAdresse() == null || entreprise.getAdresse().trim().isEmpty() ||
                entreprise.getEmail() == null || entreprise.getEmail().trim().isEmpty() ||
                entreprise.getTelephone() == null) {
            throw new IllegalArgumentException("Tous les champs sont obligatoires !");
        }

        if (entreprise.getNom().trim().length() < 2) {
            throw new IllegalArgumentException("Le nom doit contenir au moins 2 caractères !");
        }

        String emailRegex = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
        if (!Pattern.matches(emailRegex, entreprise.getEmail())) {
            throw new IllegalArgumentException("L'email doit être au format valide (example@domaine.com) !");
        }
        if (entrepriseRepository.existsByEmail(entreprise.getEmail())) {
            throw new IllegalArgumentException("Cet email est déjà utilisé par une autre entreprise !");
        }

        String telephoneStr = String.valueOf(entreprise.getTelephone());
        if (telephoneStr.length() < 8) {
            throw new IllegalArgumentException("Le numéro de téléphone doit contenir au moins 8 chiffres !");
        }
        if (entrepriseRepository.existsByTelephone(entreprise.getTelephone())) {
            throw new IllegalArgumentException("Ce numéro de téléphone est déjà utilisé par une autre entreprise !");
        }

        Entreprise saved = entrepriseRepository.save(entreprise);

        logger.info("Entreprise ajoutée avec succès : Nom = {}, Adresse = {}, Email = {}, Téléphone = {}",
                saved.getNom(), saved.getAdresse(), saved.getEmail(), saved.getTelephone());

        return saved;
    }

    public Optional<Entreprise> checkIfEntrepriseExists(String nom, String adresse, String email) {
        return entrepriseRepository.findByNomAndAdresseAndEmail(nom, adresse, email);
    }

    public List<Entreprise> getAllEntreprises() {
        return this.entrepriseRepository.findAll();
    }
    public void deleteEntreprise(Long id) {
        boolean exists = this.entrepriseRepository.existsById(id);
        if (!exists) {
            throw new IllegalArgumentException("Cette entreprise n'existe pas !");
        }
        this.entrepriseRepository.deleteById(id);
    }
    public void updateEntreprise(Long id, Entreprise updatedEntreprise) {
        // Vérifier si l'entreprise existe
        Entreprise existingEntreprise = entrepriseRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cette entreprise n'existe pas !"));

        if (updatedEntreprise.getNom() == null || updatedEntreprise.getNom().trim().isEmpty() ||
                updatedEntreprise.getAdresse() == null || updatedEntreprise.getAdresse().trim().isEmpty() ||
                updatedEntreprise.getEmail() == null || updatedEntreprise.getEmail().trim().isEmpty() ||
                updatedEntreprise.getTelephone() == null) {
            throw new IllegalArgumentException("Tous les champs sont obligatoires !");
        }

        if (updatedEntreprise.getNom().trim().length() < 2 || updatedEntreprise.getNom().trim().length() > 50) {
            throw new IllegalArgumentException("Le nom doit contenir entre 2 et 50 caractères !");
        }

        if (updatedEntreprise.getAdresse().trim().length() < 5 || updatedEntreprise.getAdresse().trim().length() > 100) {
            throw new IllegalArgumentException("L'adresse doit contenir entre 5 et 100 caractères !");
        }

        String emailRegex = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
        if (!Pattern.matches(emailRegex, updatedEntreprise.getEmail())) {
            throw new IllegalArgumentException("L'email doit être au format valide (exemple@domaine.com) !");
        }

        if (!existingEntreprise.getEmail().equalsIgnoreCase(updatedEntreprise.getEmail()) &&
                entrepriseRepository.existsByEmailIgnoreCase(updatedEntreprise.getEmail())) {
            throw new IllegalArgumentException("Cette adresse email est déjà utilisée !");
        }

        // Vérification du format du téléphone (au moins 8 chiffres)
        String telephoneStr = String.valueOf(updatedEntreprise.getTelephone());
        if (!telephoneStr.matches("\\d{8,}")) {
            throw new IllegalArgumentException("Le téléphone doit contenir au moins 8 chiffres !");
        }

        // Vérification de l'unicité du téléphone (sauf pour l'entreprise actuelle)
        if (!existingEntreprise.getTelephone().equals(updatedEntreprise.getTelephone()) &&
                entrepriseRepository.existsByTelephone(updatedEntreprise.getTelephone())) {
            throw new IllegalArgumentException("Ce numéro de téléphone est déjà utilisé !");
        }

        existingEntreprise.setNom(updatedEntreprise.getNom().trim());
        existingEntreprise.setAdresse(updatedEntreprise.getAdresse().trim());
        existingEntreprise.setEmail(updatedEntreprise.getEmail().trim());
        existingEntreprise.setTelephone(updatedEntreprise.getTelephone());

        entrepriseRepository.save(existingEntreprise);
    }

    public Entreprise getEntrepriseById(Long id) {
        return entrepriseRepository.findById(id).orElse(null);
    }

}
