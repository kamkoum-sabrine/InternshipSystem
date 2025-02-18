package com.example.Back.Auth.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Back.Auth.Models.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Role findRoleByNom(String name);

}
