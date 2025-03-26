package com.example.Back.Entreprises.Services;

import com.example.Back.Entreprises.Models.Entreprise;
import com.example.Back.Entreprises.Repositories.EntreprisesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Pattern;

@Service
public class EntreprisesService {
    private final EntreprisesRepository entrepriseRepository;

    @Autowired
    public EntreprisesService(EntreprisesRepository entrepriseRepository) {
        this.entrepriseRepository = entrepriseRepository;
    }

    public void addEntreprise(Entreprise entreprise) {
        // 1️⃣ Vérification que tous les champs sont remplis
        if (entreprise.getNom() == null || entreprise.getNom().trim().isEmpty() ||
                entreprise.getAdresse() == null || entreprise.getAdresse().trim().isEmpty() ||
                entreprise.getEmail() == null || entreprise.getEmail().trim().isEmpty() ||
                entreprise.getTelephone() == null) { // Vérification seulement null pour Long
            throw new IllegalArgumentException("Tous les champs sont obligatoires !");
        }

        // 2️⃣ Vérification du format de l'email (doit être au format example@domaine.com ou autre extension)
        String emailRegex = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
        if (!Pattern.matches(emailRegex, entreprise.getEmail())) {
            throw new IllegalArgumentException("L'email doit être au format example@domaine.com !");
        }

        // 3️⃣ Vérification du format du téléphone
        if (entreprise.getTelephone() <= 0) {
            throw new IllegalArgumentException("Le numéro de téléphone doit être un nombre positif !");
        }
        String telephoneStr = String.valueOf(entreprise.getTelephone());
        if (telephoneStr.length() < 8 || telephoneStr.length() > 15) {
            throw new IllegalArgumentException("Le numéro de téléphone doit contenir entre 8 et 15 chiffres !");
        }

        // 5️⃣ Vérification si une entreprise existe déjà avec le même nom ET la même adresse
        if (entrepriseRepository.existsByNomAndAdresse(entreprise.getNom(), entreprise.getAdresse())) {
            throw new IllegalArgumentException("Cette entreprise existe déjà !");
        }
        // 4️⃣ Vérification de l'unicité du numéro de téléphone
        if (entrepriseRepository.existsByTelephone(entreprise.getTelephone())) {
            throw new IllegalArgumentException("Ce numéro de téléphone existe déja !");
        }


        // 6️⃣ Sauvegarde de l'entreprise
        entrepriseRepository.save(entreprise);
    }
    // Ajout de la méthode dans le service


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

        // Vérification que tous les champs sont remplis
        if (updatedEntreprise.getNom() == null || updatedEntreprise.getNom().trim().isEmpty() ||
                updatedEntreprise.getAdresse() == null || updatedEntreprise.getAdresse().trim().isEmpty() ||
                updatedEntreprise.getEmail() == null || updatedEntreprise.getEmail().trim().isEmpty() ||
                updatedEntreprise.getTelephone() == null) {
            throw new IllegalArgumentException("Tous les champs sont obligatoires !");
        }

        // Vérification du format de l'email
        String emailRegex = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
        if (!Pattern.matches(emailRegex, updatedEntreprise.getEmail())) {
            throw new IllegalArgumentException("L'email doit être au format example@domaine.com !");
        }

        // Vérification du format du téléphone
        if (updatedEntreprise.getTelephone() <= 0) {
            throw new IllegalArgumentException("Le numéro de téléphone doit être un nombre positif !");
        }
        String telephoneStr = String.valueOf(updatedEntreprise.getTelephone());
        if (telephoneStr.length() < 8 || telephoneStr.length() > 15) {
            throw new IllegalArgumentException("Le numéro de téléphone doit contenir entre 8 et 15 chiffres !");
        }

        // Vérification de l'unicité du numéro de téléphone (uniquement si différent de l'ancien)
        if (!existingEntreprise.getTelephone().equals(updatedEntreprise.getTelephone()) &&
                entrepriseRepository.existsByTelephone(updatedEntreprise.getTelephone())) {
            throw new IllegalArgumentException("Ce numéro de téléphone existe déjà !");
        }

        // Vérification si une entreprise existe déjà avec le même nom et la même adresse (uniquement si différent de l'ancien)
        if (!existingEntreprise.getNom().equals(updatedEntreprise.getNom()) ||
                !existingEntreprise.getAdresse().equals(updatedEntreprise.getAdresse())) {
            if (entrepriseRepository.existsByNomAndAdresse(updatedEntreprise.getNom(), updatedEntreprise.getAdresse())) {
                throw new IllegalArgumentException("Une entreprise avec le même nom et la même adresse existe déjà !");
            }
        }

        // Mise à jour des champs
        existingEntreprise.setNom(updatedEntreprise.getNom());
        existingEntreprise.setAdresse(updatedEntreprise.getAdresse());
        existingEntreprise.setEmail(updatedEntreprise.getEmail());
        existingEntreprise.setTelephone(updatedEntreprise.getTelephone());

        // Sauvegarde de l'entreprise mise à jour
        entrepriseRepository.save(existingEntreprise);
    }

}
