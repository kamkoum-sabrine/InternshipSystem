package com.example.Back.Conventions.Models;

import lombok.Data;

@Data
public class TuteurPFEDTO {
    private String nom;
    private String prenom;
    private String fonction;
    private String grade;
    private Integer telephone;
    private Integer fax;
    private String email;
    private String sitePerso;
    private Long entreprise;
}
