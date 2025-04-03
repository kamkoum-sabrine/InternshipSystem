package com.example.Back.Auth.Controllers;

import java.time.LocalDateTime;
import java.util.*;

import com.example.Back.Soutenance.Model.Enseignant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Back.Auth.Config.WebSecurityConfig;
import com.example.Back.Auth.Models.User;
import com.example.Back.Auth.Models.UserDTO;
import com.example.Back.Auth.Repositories.RoleRepository;
import com.example.Back.Auth.Repositories.UserRepository;
import com.example.Back.Auth.Services.MailService;
import com.example.Back.Auth.Services.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    private MailService mailService;

    public UserController(MailService mailService) {
        this.mailService = mailService;
    }



    @RequestMapping(value = "/register", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<Map<String, Object>> saveUser(@RequestBody UserDTO userDTO) {
        System.out.println("Reçu : " + userDTO.getEmail()); // Debug

        if (userDTO.getEmail() == null) {
            // JSONObject error = new JSONObject();
            Map<String, Object> error = new HashMap<>();
            error.put("message", "Missing field: email");
            error.put("status", HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(error);
        }
        System.out.println("Vérification email : " + userDTO.getEmail());
        System.out.println("Utilisateur trouvé : " + userRepository.findUserByEmail(userDTO.getEmail()));

        if (userRepository.findUserByEmail(userDTO.getEmail()).isPresent()) {
            // JSONObject error = new JSONObject();
            Map<String, Object> error = new HashMap<>();
            error.put("message", "email already exists");
            error.put("status", HttpStatus.BAD_REQUEST.value());
            System.out.println("Réponse d'erreur : " + error.toString());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(error);
        }
        User appUser = new User();
        appUser.setNom(userDTO.getNom());
        appUser.setPrenom(userDTO.getPrenom());
        appUser.setEmail(userDTO.getEmail());
        appUser.setCin(userDTO.getCin());
        appUser.setNiveau(userDTO.getNiveau());
        appUser.setFiliere(userDTO.getFiliere());
        appUser.setAdresse(userDTO.getAdresse());
        appUser.setSexe(userDTO.getSexe());
        appUser.setLieuNaissance(userDTO.getLieuNaissance());
        appUser.setOption(userDTO.getOption());
        appUser.setFax(userDTO.getFax());
        String randomPassword = UUID.randomUUID().toString().replace("-",
                "").substring(0, 8);

        appUser.setPassword(WebSecurityConfig.passwordEncoder().encode(randomPassword));
        userDTO.setPassword(randomPassword);
        // appUser.setPassword(WebSecurityConfig.passwordEncoder().encode(userDTO.getPassword()));
        // // Sécurisé
        appUser.setActive(true);
        appUser.setCreatedAt( LocalDateTime.now());
        appUser.setRole(roleRepository.findRoleByNom(userDTO.getRole()));

        userRepository.save(appUser);

        String subject = "Bienvenue " + appUser.getPrenom() + " sur la plateforme de gestion des stages - ENICAR";
        // helper.setSubject("Bienvenue sur la plateforme de gestion des stages -
        // ENICAR");

        String body = "Bonjour " + appUser.getPrenom() + ",\n\n"
                + "Votre compte a été créé avec succès sur la plateforme de gestion des stages de l'ENICAR.\n"
                + "Voici vos informations :\n"
                + "- Email : " + appUser.getEmail() + "\n"
                + "- Mot de passe : " + randomPassword + "\n"
                + "À bientôt !" + "\n"
                + "Vous pouvez vous connecter dès maintenant en cliquant sur le lien ci-dessous :" + "\n"
                + "https://enic-stages.com/login \n"
                + "Cordialement,\nL'équipe ENICAR\n";

        mailService.sendEmail(appUser.getEmail(), subject, body);

        // JSONObject success = new JSONObject();
        Map<String, Object> success = new HashMap<>();
        success.put("message", "User registered successfully, email sent!");
        success.put("user", userDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(success);
    }

    @RequestMapping(value = "/activate", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> activateAccount(@RequestBody Long idUser) {
        Optional<User> user = userService.findUser(idUser);
        Map<String, Object> response = new HashMap<>();

        if (user.isPresent()) {
            User existingUser = user.get();

            existingUser.setActive(true);
            userService.saveUser(existingUser);

            response.put("message", "Compte activé avec succès !");
            response.put("status", HttpStatus.ACCEPTED.value());
            return ResponseEntity.status(HttpStatus.ACCEPTED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(response);
        } else {
            response.put("message", "Utilisateur introuvable !");
            response.put("status", HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(response);
        }

    }

    @RequestMapping(value = "/desactivate", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> desactivateAccount(@RequestBody Long idUser) {
        Optional<User> user = userService.findUser(idUser);
        Map<String, Object> response = new HashMap<>();

        if (user.isPresent()) {
            User existingUser = user.get();

            existingUser.setActive(false);
            userService.saveUser(existingUser);

            response.put("message", "Compte desactivé avec succès !");
            response.put("status", HttpStatus.ACCEPTED.value());
            return ResponseEntity.status(HttpStatus.ACCEPTED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(response);
        } else {
            response.put("message", "Utilisateur introuvable !");
            response.put("status", HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(response);
        }

    }
    @GetMapping("/getAll")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

     @GetMapping("/userId/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
         return userService.findUserById(id);
     }

    @GetMapping("/etudiants")
    public List<User> getAllEtudiants() {
        return userService.getAlletudiants();

    }
}
