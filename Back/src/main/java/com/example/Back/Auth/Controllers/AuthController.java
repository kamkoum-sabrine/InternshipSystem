package com.example.Back.Auth.Controllers;

import com.example.Back.Auth.Config.JwtUtil;
import com.example.Back.Auth.Models.AuthRequest;
import com.example.Back.Auth.Models.User;
import com.example.Back.Auth.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        System.out.println("Email"+authRequest.getEmail());
        System.out.println("Password"+authRequest.getPassword());
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );

            String token = jwtUtil.generateToken(authRequest.getEmail());
           /// Map<String, String> response = new HashMap<>();
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);


            response.put("token", token);


            User user = userRepository.findUserByEmail(authRequest.getEmail()).get();
            Object userResp = new Object() {
                public Long id = user.getId();
                public String nom = user.getNom();
                public String prenom = user.getPrenom();
                public String email = user.getEmail();
                public String password = user.getPassword();
                public Object roles = user.getRole();

            };

            response.put("user", user);

            return ResponseEntity.ok(response);

        } catch (AuthenticationException e) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
