package com.example.Back.Attestation.Controller;

import com.example.Back.Attestation.Model.Attestation;
import com.example.Back.Attestation.Model.AttestationDTO;
import com.example.Back.Attestation.Repositories.AttestationRepository;
import com.example.Back.Attestation.Service.AttestationService;
import com.example.Back.Auth.Models.User;
import com.example.Back.Auth.Repositories.UserRepository;
import com.example.Back.Conventions.Models.ConventionStageEte;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/attestations")
public class AttestationController {
    @Value("${file.upload-dir}/attestations")
    private String uploadDir;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AttestationService attestationService;
    @Autowired
    private AttestationRepository attestationRepository;

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
    @GetMapping("/getMyAttestation/{id}")
    public List<Attestation> getAttestationByEtudiant(@PathVariable("id" ) Long etudiantId) {
        User etudiant = userRepository.findById(etudiantId).orElse(null);
        if (etudiant == null) {
            throw new RuntimeException("Étudiant non trouvé !");
        }
        return attestationRepository.findByEtudiant(etudiant);
    }



    @GetMapping("/uploads/{fileName:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(fileName);
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .contentType(MediaType.APPLICATION_PDF)
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.internalServerError().body(null);
        }
    }

}

