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

   /* @Value("${file.upload-dir}")
    private String baseUploadDir;*/
   @Value("${file.upload-dir}/attestations")
   private String uploadDir;

  // private final String attestationSubDir = "attestations";

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

   /* @GetMapping("/uploads/{fileName:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String fileName) {
        logger.info(">>> Début de la récupération du fichier : {}", fileName);
        try {
            Path uploadPath = Paths.get(baseUploadDir, attestationSubDir).toAbsolutePath().normalize();
            logger.info(">>> Dossier d'upload : {}", uploadPath);

            Path filePath = uploadPath.resolve(fileName).normalize();
            logger.info(">>> Chemin absolu reconstruit : {}", filePath);

            // Sécurité : s'assurer que le fichier est bien dans le bon répertoire
            if (!filePath.startsWith(uploadPath)) {
                logger.warn(">>> Tentative d'accès interdit : {}", filePath);
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            if (!Files.exists(filePath)) {
                logger.warn(">>> Fichier introuvable : {}", filePath);
                return ResponseEntity.notFound().build();
            }

            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.isReadable()) {
                logger.warn(">>> Fichier non lisible : {}", filePath);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }

            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                contentType = "application/octet-stream";
                logger.info(">>> Type MIME par défaut utilisé : {}", contentType);
            } else {
                logger.info(">>> Type MIME détecté : {}", contentType);
            }

            logger.info(">>> Fichier prêt à être envoyé : {}", fileName);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);

        } catch (MalformedURLException e) {
            logger.error(">>> Erreur de format d'URL pour le fichier {}", fileName, e);
            return ResponseEntity.internalServerError().build();
        } catch (IOException e) {
            logger.error(">>> Erreur d'accès au fichier {}", fileName, e);
            return ResponseEntity.internalServerError().build();
        } catch (Exception e) {
            logger.error(">>> Erreur inattendue lors du téléchargement du fichier {}", fileName, e);
            return ResponseEntity.internalServerError().build();
        }
    }*/


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
   /* @GetMapping("/list")
    public ResponseEntity<?> listAllAttestationFiles() {
        try {
            Path uploadPath = Paths.get(baseUploadDir, attestationSubDir).toAbsolutePath().normalize();
            logger.info("Liste des fichiers dans : {}", uploadPath);

            if (!Files.exists(uploadPath) || !Files.isDirectory(uploadPath)) {
                logger.warn("Répertoire non trouvé ou invalide : {}", uploadPath);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Répertoire introuvable.");
            }

            List<String> fileNames = Files.list(uploadPath)
                    .filter(Files::isRegularFile)
                    .map(path -> path.getFileName().toString())
                    .toList();

            logger.info("Fichiers trouvés : {}", fileNames);

            return ResponseEntity.ok(fileNames);

        } catch (IOException e) {
            logger.error("Erreur lors de la lecture du répertoire des attestations", e);
            return ResponseEntity.internalServerError().body("Erreur lors de la lecture du répertoire.");
        }
    }*/

}
