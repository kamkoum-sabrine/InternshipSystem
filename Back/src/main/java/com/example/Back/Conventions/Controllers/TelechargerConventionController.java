package com.example.Back.Conventions.Controllers;

import com.example.Back.Auth.Models.User;
import com.example.Back.Auth.Services.UserService;
import com.example.Back.Conventions.Services.TelechargerConventionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/pdf")

public class TelechargerConventionController {
    private final TelechargerConventionService telechargerConventionService;
    private final UserService userService;

    @Autowired
    public TelechargerConventionController(TelechargerConventionService telechargerConventionService , UserService userService) {
        this.telechargerConventionService = telechargerConventionService;
        this.userService = userService;
    }

    @GetMapping("/convention/{id}")
    public ResponseEntity<byte[]> generatePdf(@PathVariable Long id) throws IOException {
        // Vérifier si l'ID est valide
        if (id == null) {
            return ResponseEntity.badRequest().body(null);
        }

        // Récupérer l'étudiant par son ID
        Optional<User> etudiant = userService.findUserById(id);

        if (etudiant == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // Remplir les données du formulaire
        Map<String, String> formData = new HashMap<>();
        formData.put("Nom", etudiant.get().getNom());
        formData.put("Prénom", etudiant.get().getPrenom());
        formData.put("Filière", String.valueOf(etudiant.get().getFiliere()));
        formData.put("N° CIN", String.valueOf(etudiant.get().getCin()));
        formData.put("Ntéléphone", etudiant.get().getTel());
        formData.put("E-mail", etudiant.get().getEmail());
        formData.put("Niveau", String.valueOf(etudiant.get().getNiveau()));
        formData.put("Formation", String.valueOf(etudiant.get().getFormation()));

        byte[] pdfBytes = telechargerConventionService.generateConventionPdf(formData);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=convention_stage.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }


}
