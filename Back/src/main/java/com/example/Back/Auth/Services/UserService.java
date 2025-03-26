package com.example.Back.Auth.Services;

import java.util.List;
import java.util.Optional;

import com.example.Back.Auth.Repositories.RoleRepository;
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
}
