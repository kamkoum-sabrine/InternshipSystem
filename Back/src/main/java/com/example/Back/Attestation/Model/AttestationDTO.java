package com.example.Back.Attestation.Model;

import com.example.Back.enums.Sexe;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AttestationDTO {
    private Long id;
    private Long etudiantId;
    private String nomEtudiant;
    private String prenomEtudiant;
    private Sexe sexe;
    private String nomFichier;
    private String cheminFichier;
    private Date dateDepot;

}
