package com.example.Back.Attestation.Controller;

import com.example.Back.Attestation.Model.AttestationDTO;
import com.example.Back.Attestation.Service.AttestationService;
import com.example.Back.Auth.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/attestations")
public class AttestationController {

    @Autowired
    private AttestationService attestationService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadAttestation(@RequestParam("file") MultipartFile file,
                                               @RequestParam("etudiantId") Long etudiantId) {
        try {
            // Créer un objet User avec seulement l'ID (sans charger de la base)
            User etudiant = new User();
            etudiant.setId(etudiantId);

            // Appel du service, retour d'un DTO
            AttestationDTO savedDTO = attestationService.uploadAttestation(etudiant, file);
            return ResponseEntity.ok(savedDTO);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur lors de l'upload : " + e.getMessage());
        }
    }
}
