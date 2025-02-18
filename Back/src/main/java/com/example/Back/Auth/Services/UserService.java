package com.example.Back.Auth.Services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.Back.Auth.Models.User;
import com.example.Back.Auth.Repositories.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public Optional<User> findUser(Integer id) {
        return userRepository.findById(id);
    }
}
