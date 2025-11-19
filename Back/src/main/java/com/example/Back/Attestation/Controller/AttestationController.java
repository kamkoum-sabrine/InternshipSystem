package com.example.Back.Attestation.Controller;

import com.example.Back.Attestation.Model.Attestation;
import com.example.Back.Attestation.Model.AttestationDTO;
import com.example.Back.Attestation.Repositories.AttestationRepository;
import com.example.Back.Attestation.Service.AttestationService;
import com.example.Back.Auth.Models.User;
import com.example.Back.Auth.Repositories.UserRepository;
import com.example.Back.Conventions.Models.ConventionStageEte;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.List;

@RestController
@RequestMapping("/api/attestations")
public class AttestationController {

    private static final Logger logger = LoggerFactory.getLogger(AttestationController.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AttestationService attestationService;

    @Autowired
    private AttestationRepository attestationRepository;

   @Value("${file.upload-dir}/attestations")
   private String uploadDir;


    @PostMapping("/upload")
    public ResponseEntity<?> uploadAttestation(@RequestParam("file") MultipartFile file,
                                               @RequestParam("etudiantId") Long etudiantId) {
        logger.info("Tentative d'upload du fichier pour l'étudiant ID : {}", etudiantId);
        try {
            User etudiant = new User();
            etudiant.setId(etudiantId);

            AttestationDTO savedDTO = attestationService.uploadAttestation(etudiant, file);
            logger.info("Fichier uploadé avec succès : {}", savedDTO.getNomFichier());
            return ResponseEntity.ok(savedDTO);

        } catch (Exception e) {
            logger.error("Erreur lors de l'upload du fichier", e);
            return ResponseEntity.badRequest().body("Erreur lors de l'upload : " + e.getMessage());
        }
    }
    @GetMapping("/getAttestations")
    public ResponseEntity<List<Attestation>> getAttestations() {
        List<Attestation> attestations = attestationRepository.findAll();
        return ResponseEntity.ok(attestations);
    }

    @GetMapping("/getMyAttestation/{id}")
    public ResponseEntity<?> getAttestationByEtudiant(@PathVariable("id") Long etudiantId) {
        logger.info("Récupération des attestations pour l'étudiant ID : {}", etudiantId);
        try {
            User etudiant = userRepository.findById(etudiantId).orElse(null);
            if (etudiant == null) {
                logger.warn("Étudiant non trouvé avec ID : {}", etudiantId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Étudiant non trouvé !");
            }
            List<Attestation> attestations = attestationRepository.findByEtudiant(etudiant);
            logger.info("Nombre d'attestations récupérées : {}", attestations.size());
            return ResponseEntity.ok(attestations);
        } catch (Exception e) {
            logger.error("Erreur lors de la récupération des attestations", e);
            return ResponseEntity.internalServerError().body("Erreur serveur");
        }
    }


    @GetMapping("/download/{attestationId}")
    public ResponseEntity<Resource> downloadAttestation(@PathVariable Long attestationId) {
        logger.info("Téléchargement de l'attestation avec ID : {}", attestationId);
        try {
            Attestation attestation = attestationRepository.findById(attestationId).orElse(null);
            if (attestation == null) {
                logger.warn("Attestation non trouvée pour ID : {}", attestationId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            String fileName = attestation.getNomFichier(); // Nom réel du fichier enregistré
            Path filePath = Paths.get(uploadDir).resolve(fileName).normalize();

            if (!Files.exists(filePath)) {
                logger.warn("Fichier non trouvé : {}", filePath);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists() || !resource.isReadable()) {
                logger.warn("Fichier illisible : {}", filePath);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }

            String contentType = Files.probeContentType(filePath);
            if (contentType == null) contentType = "application/pdf";

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);

        } catch (IOException e) {
            logger.error("Erreur lors du téléchargement de l'attestation", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
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
