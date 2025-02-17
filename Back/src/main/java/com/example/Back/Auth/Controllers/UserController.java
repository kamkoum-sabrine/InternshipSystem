package com.example.Back.Auth.Controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.Back.Auth.Config.WebSecurityConfig;
import com.example.Back.Auth.Models.User;
import com.example.Back.Auth.Models.UserDTO;
import com.example.Back.Auth.Repositories.RoleRepository;
import com.example.Back.Auth.Repositories.UserRepository;
import com.example.Back.Auth.Services.MailService;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    UserRepository userRepository;

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
        String randomPassword = UUID.randomUUID().toString().replace("-",
                "").substring(0, 8);

        appUser.setPassword(randomPassword);
        userDTO.setPassword(randomPassword);
        // appUser.setPassword(WebSecurityConfig.passwordEncoder().encode(userDTO.getPassword()));
        // // Sécurisé
        appUser.setActive(false);
        appUser.setRole(roleRepository.findRoleByNom(userDTO.getRole()));

        userRepository.save(appUser);

        String subject = "Bienvenue " + appUser.getPrenom() + " sur la plateforme de gestion des stages - ENICAR";
        // helper.setSubject("Bienvenue sur la plateforme de gestion des stages -
        // ENICAR");

        String body = "Bonjour " + appUser.getPrenom() + ",\n\n"
                + "Votre compte a été créé avec succès sur la plateforme de gestion des stages de l'ENICAR.\n"
                + "Voici vos informations :\n"
                + "- Email : " + appUser.getEmail() + "\n"
                + "- Mot de passe : " + appUser.getPassword() + "\n"
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

    // @RequestMapping(value = "/register", method = RequestMethod.POST)

    // public ResponseEntity<JSONObject> saveUser(@RequestBody User user) {

    // User appUser = new User();
    // // user.get("email");
    // if (userRepository.findUserByEmail(user.getEmail().toString()).isPresent()) {
    // JSONObject item = new JSONObject();
    // item.put("message", "email already exists");
    // item.put("status", HttpStatus.BAD_REQUEST.value());
    // return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(item);
    // }
    // // String randomPassword = UUID.randomUUID().toString().replace("-",
    // // "").substring(0, 12);
    // //
    // appUser.setPassword(WebSecurityConfig.passwordEncoder().encode(randomPassword));

    // appUser.setNom(user.getNom().toString());
    // appUser.setPassword(user.getPassword().toString());
    // appUser.setPrenom(user.getPrenom().toString());
    // appUser.setEmail(user.getEmail().toString());
    // appUser.setActive(false);
    // appUser.setRole(roleRepository.findRoleByNom(user.getRole().toString()));

    // User newUser = userRepository.save(appUser);
    // // Optional<UserRole> userRole =
    // // userRoleRepository.findFirstByUserId(newUser.getId());
    // /**
    // * try {
    // * mailingService.sendVerificationEmail(newUser);
    // * } catch (Exception e) {
    // * JSONObject item = new JSONObject();
    // * item.put("message", e.getMessage());
    // * item.put("status", HttpStatus.BAD_REQUEST.value());
    // * e.printStackTrace();
    // * return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(item);
    // * }
    // */
    // JSONObject item = new JSONObject();
    // item.put("message", "Account");
    // item.put("user", userRepository.findUserByEmail(newUser.getEmail()).get());
    // return ResponseEntity.status(HttpStatus.CREATED).body(item);

    // }
}
