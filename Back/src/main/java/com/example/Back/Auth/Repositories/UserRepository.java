package com.example.Back.Auth.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Back.Auth.Models.User;

public interface UserRepository extends JpaRepository<User, Integer> {

}
