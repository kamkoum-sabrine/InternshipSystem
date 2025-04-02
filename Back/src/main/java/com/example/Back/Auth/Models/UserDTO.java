package com.example.Back.Auth.Models;

import jakarta.persistence.Column;

public class UserDTO {
    private String email;
    private String nom;
    private String prenom;
    private String password;
    private String role;
    private Integer cin;
    private String filiere;
    private String niveau;

    // Getters et setters obligatoires
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Integer getCin() {
        return cin;
    }
    public void setCin(Integer cin) {
        this.cin = cin;
    }
    public String getFiliere() {
        return filiere;
    }
    public void setFiliere(String filiere) {
        this.filiere = filiere;
    }
    public String getNiveau() {
        return niveau;
    }
    public void setNiveau(String niveau) {
        this.niveau = niveau;
    }
}
