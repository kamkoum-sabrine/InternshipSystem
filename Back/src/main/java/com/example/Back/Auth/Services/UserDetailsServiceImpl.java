package com.example.Back.Auth.Services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.Back.Auth.Models.User;
import com.example.Back.Auth.Repositories.UserRepository;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserDetailsServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


   @Override
   public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
       User user = userRepository.findByEmail(email)
               .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé"));

       return new org.springframework.security.core.userdetails.User(
               user.getEmail(), user.getPassword(), new ArrayList<>()
       );
   }
    public boolean authenticate(String email, String rawPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé"));

        boolean passwordMatches = passwordEncoder.matches(rawPassword, user.getPassword());

        if (!passwordMatches) {
            System.out.println("Mot de passe incorrect !");
        } else {
            System.out.println("Authentification réussie !");
        }

        return passwordMatches;
    }

}
