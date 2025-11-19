package com.example.Back.Auth.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

import com.example.Back.Auth.Repositories.RoleRepository;
import com.example.Back.Entreprises.Models.Entreprise;
import org.springframework.stereotype.Service;

import com.example.Back.Auth.Models.User;
import com.example.Back.Auth.Repositories.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserService(UserRepository userRepository , RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository ;
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    public List<User> getAlletudiants() {
        return userRepository.getUsersByRole(roleRepository.findRoleByNom("Etudiant"));
    }


    public Optional<User> findUser(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> findUserById(Long id) { return userRepository.findById(id);  }



    public void updateUser(Long id, User updatedUser) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cet utilisateur n'existe pas !"));

        if (updatedUser.getNom() == null || updatedUser.getNom().trim().isEmpty() ||
                updatedUser.getPrenom() == null || updatedUser.getPrenom().trim().isEmpty() ||
                updatedUser.getEmail() == null || updatedUser.getEmail().trim().isEmpty() ||
                updatedUser.getCin() == null) {
            throw new IllegalArgumentException("Nom, prénom, email et CIN sont obligatoires !");
        }

        if (updatedUser.getNom().trim().length() < 2 || updatedUser.getNom().trim().length() > 50) {
            throw new IllegalArgumentException("Le nom doit contenir entre 2 et 50 caractères !");
        }

        // Vérification de la longueur du prénom (2-50 caractères)
        if (updatedUser.getPrenom().trim().length() < 2 || updatedUser.getPrenom().trim().length() > 50) {
            throw new IllegalArgumentException("Le prénom doit contenir entre 2 et 50 caractères !");
        }

        // Vérification du format de l'email
        String emailRegex = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
        if (!Pattern.matches(emailRegex, updatedUser.getEmail())) {
            throw new IllegalArgumentException("L'email doit être au format valide (exemple@domaine.com) !");
        }

        if (!existingUser.getEmail().equalsIgnoreCase(updatedUser.getEmail()) &&
                userRepository.existsByEmailIgnoreCase(updatedUser.getEmail())) {
            throw new IllegalArgumentException("Cette adresse email est déjà utilisée !");
        }

        // Vérification du CIN (8 chiffres)
        if (String.valueOf(updatedUser.getCin()).length() != 8) {
            throw new IllegalArgumentException("Le CIN doit contenir exactement 8 chiffres !");
        }

        // Vérification du format du téléphone si fourni
        if (updatedUser.getTel() != null && !updatedUser.getTel().isEmpty()) {
            if (!updatedUser.getTel().matches("\\d{8,15}")) {
                throw new IllegalArgumentException("Le téléphone doit contenir entre 8 et 15 chiffres !");
            }

            // Vérification unicité du téléphone
            if (!updatedUser.getTel().equals(existingUser.getTel()) &&
                    userRepository.existsByTel(updatedUser.getTel())) {
                throw new IllegalArgumentException("Ce numéro de téléphone est déjà utilisé !");
            }
        }

        // Vérification du fax si fourni
        if (updatedUser.getFax() != null && !updatedUser.getFax().isEmpty()) {
            if (!updatedUser.getFax().matches("\\d+")) {
                throw new IllegalArgumentException("Le fax ne doit contenir que des chiffres !");
            }
        }

        if (updatedUser.getPhoto() != null && updatedUser.getPhoto().trim().isEmpty()) {
            throw new IllegalArgumentException("La photo est présente mais est vide !");
        }


        // Mise à jour des champs
        existingUser.setNom(updatedUser.getNom().trim());
        existingUser.setPrenom(updatedUser.getPrenom().trim());
        existingUser.setEmail(updatedUser.getEmail().trim());
        existingUser.setCin(updatedUser.getCin());
        existingUser.setTel(updatedUser.getTel());
        existingUser.setAdresse(updatedUser.getAdresse());
        existingUser.setFiliere(updatedUser.getFiliere());
        existingUser.setNiveau(updatedUser.getNiveau());
        existingUser.setOption(updatedUser.getOption());
        existingUser.setFax(updatedUser.getFax());
        existingUser.setSexe(updatedUser.getSexe());
        existingUser.setLieuNaissance(updatedUser.getLieuNaissance());
        existingUser.setFormation(updatedUser.getFormation());
        existingUser.setDateDeNaissance(updatedUser.getDateDeNaissance());
        existingUser.setPhoto(updatedUser.getPhoto());

         // Sauvegarde de l'utilisateur mis à jour
        userRepository.save(existingUser);
    }


    public List<String> getAllEmailsAndPhonesAndFax () {
        List<User> users = userRepository.findAll() ;
        List<String> EmailsPhonesFax = new ArrayList<String>();
        for (User user : users) {
            EmailsPhonesFax.add(user.getEmail());
            EmailsPhonesFax.add(user.getTel());
            EmailsPhonesFax.add(user.getFax());
            EmailsPhonesFax.add(String.valueOf(user.getCin()));

        }
        return EmailsPhonesFax ;
    }

}
