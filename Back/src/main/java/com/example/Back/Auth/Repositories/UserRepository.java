package com.example.Back.Auth.Repositories;

import java.util.List;
import java.util.Optional;

import com.example.Back.Auth.Models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Back.Auth.Models.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByEmail(String email);

    Optional<User> findUserById(Long id) ;

    List<User> getUsersByRole(Role role);
}
