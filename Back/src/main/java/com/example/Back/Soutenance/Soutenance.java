package com.example.Back.Soutenance;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public class Soutenance {
    private Long id;
    private LocalDate date ;
    private LocalTime heure ;
    private int salle ;
    private Long etudiantId ;
    private Long encadrantId ;
    private List<String> jury ;
    private String sujet ;


}
