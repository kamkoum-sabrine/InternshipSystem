package com.example.Back.Auth.Models;

import com.example.Back.enums.Filiere;
import com.example.Back.enums.Formation;
import com.example.Back.enums.Niveau;
import com.example.Back.enums.Sexe;
import jakarta.persistence.Column;

import java.time.LocalDate;

import java.util.Date;

public class UserDTO {
    private String email;
    private String nom;
    private String prenom;
    private String password;
    private String role;
    private Integer cin;
    private Filiere filiere;
    private Niveau niveau;
    private String adresse;
    private String option;



    private String fax;
    private Sexe sexe;
    private String lieuNaissance;  
    private Formation formation;
   private String tel;
    private LocalDate dateDeNaissance;
  
    public Formation getFormation() {
        return formation;
    }
    public void setFormation(Formation formation) {
        this.formation = formation;
    }



    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public void setOption(String option) {
        this.option = option;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public void setSexe(Sexe sexe) {
        this.sexe = sexe;
    }

    public void setLieuNaissance(String lieuNaissance) {
        this.lieuNaissance = lieuNaissance;
    }

    public String getAdresse() {
        return adresse;
    }

    public String getOption() {
        return option;
    }

    public String getFax() {
        return fax;
    }

    public Sexe getSexe() {
        return sexe;
    }

    public String getLieuNaissance() {
        return lieuNaissance;
    }

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
    public Filiere getFiliere() {
        return filiere;
    }
    public void setFiliere(Filiere filiere) {
        this.filiere = filiere;
    }
    public Niveau getNiveau() {
        return niveau;
    }
    public void setNiveau(Niveau niveau) {
        this.niveau = niveau;
    }
    public LocalDate getDateDeNaissance() {
        return dateDeNaissance;
    }
    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public void setDateDeNaissance(LocalDate dateDeNaissance) {
        this.dateDeNaissance = dateDeNaissance;
    }
}
