package com.example.Back.Auth.Controllers;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.Back.Auth.Config.WebSecurityConfig;
import com.example.Back.Auth.Models.User;
import com.example.Back.Auth.Repositories.RoleRepository;
import com.example.Back.Auth.Repositories.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @RequestMapping(value = "/register", method = RequestMethod.POST)

    public ResponseEntity<JSONObject> saveUser(@RequestBody JSONObject user) {

        User appUser = new User();
        user.get("email");
        if (userRepository.findUserByEmail(user.get("email").toString()).isPresent()) {
            JSONObject item = new JSONObject();
            item.put("message", "email already exists");
            item.put("status", HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(item);
        }

        if (!user.get("password").toString().equals(user.get("confirmPassword").toString())) {
            JSONObject item = new JSONObject();
            item.put("message", "Please confirm Password");
            item.put("status", HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(item);
        }

        appUser.setNom(user.get("nom").toString());
        appUser.setPassword(WebSecurityConfig.passwordEncoder().encode(user.get("password").toString()));
        appUser.setPrenom(user.get("prenom").toString());
        appUser.setEmail(user.get("email").toString());
        appUser.setActive(false);
        appUser.setRole(roleRepository.findRoleByName(user.get("role").toString()));

        User newUser = userRepository.save(appUser);
        // Optional<UserRole> userRole =
        // userRoleRepository.findFirstByUserId(newUser.getId());
        /**
         * try {
         * mailingService.sendVerificationEmail(newUser);
         * } catch (Exception e) {
         * JSONObject item = new JSONObject();
         * item.put("message", e.getMessage());
         * item.put("status", HttpStatus.BAD_REQUEST.value());
         * e.printStackTrace();
         * return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(item);
         * }
         */
        JSONObject item = new JSONObject();
        item.put("message", "Account");
        item.put("user", userRepository.findUserByEmail(newUser.getEmail()).get());
        return ResponseEntity.status(HttpStatus.CREATED).body(item);

    }
}
