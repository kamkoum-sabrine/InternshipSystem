package com.example.Back.Auth.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Back.Auth.Models.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {

}
