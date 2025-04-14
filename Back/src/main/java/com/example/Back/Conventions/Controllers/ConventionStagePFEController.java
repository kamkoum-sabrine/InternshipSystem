package com.example.Back.Conventions.Controllers;

import com.example.Back.Auth.Models.User;
import com.example.Back.Auth.Repositories.UserRepository;
import com.example.Back.Conventions.Models.ConventionStageEte;
import com.example.Back.Conventions.Models.ConventionStagePFE;
import com.example.Back.Conventions.Models.TuteurPFE;
import com.example.Back.Conventions.Repositories.ConventionStageEteRepository;
import com.example.Back.Conventions.Repositories.TuteurPFERepository;
import com.example.Back.Conventions.Services.ConventionStageEteService;
import com.example.Back.Conventions.Services.ConventionStagePFEService;
import com.example.Back.Entreprises.Models.Entreprise;
import com.example.Back.Entreprises.Repositories.EntreprisesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.format.annotation.DateTimeFormat;
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
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/api/conventionStagPFE")
public class ConventionStagePFEController {
    private final ConventionStagePFEService conventionStagePFEService;
    private final UserRepository userRepository;
    private final EntreprisesRepository entreprisesRepository;
    private final TuteurPFERepository tuteurPFERepository;


    @Value("${file.upload-dir}/conventionsPFE")
    private String uploadDir;

    @Autowired
    public ConventionStagePFEController(ConventionStagePFEService conventionStagePFEService,
                                        UserRepository userRepository, EntreprisesRepository entreprisesRepository,
                                        TuteurPFERepository tuteurPFERepository) {
        this.conventionStagePFEService = conventionStagePFEService;
        this.userRepository = userRepository;
        this.entreprisesRepository = entreprisesRepository;
        this.tuteurPFERepository = tuteurPFERepository;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createConventionPFE(
            @RequestParam("etudiantId") Long etudiantId,
            @RequestParam("tuteurStage") Long tuteurStage,
            @RequestParam("entrepriseId") Long entrepriseId,
            @RequestParam("lieu") String lieu,
            @RequestParam("cahierDeCharge") String cahierDeCharge,
            @RequestParam("materielALaDispositionEtudiant") String materielALaDispositionEtudiant,
            @RequestParam("materielDeRealisation") String materielDeRealisation,
         //   @RequestParam("dateDebut")  @DateTimeFormat(pattern = "yyyy-MM-dd") Date dateDebut,
           // @RequestParam("dateFin")  @DateTimeFormat(pattern = "yyyy-MM-dd") Date dateFin,
            @RequestParam("fichierPDF") MultipartFile fichierPDF) {

        // Vérifier si l'étudiant existe
        Optional<User> etudiantOptional = userRepository.findById(etudiantId);
        if (etudiantOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Utilisateur non trouvé");
        }
        User etudiant = etudiantOptional.get();
        // Vérifier si l'entreprise existe
        Optional<Entreprise> entrepriseOptional = entreprisesRepository.findById(entrepriseId);
        if (entrepriseOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Entreprise non trouvée");
        }
        Entreprise entreprise = entrepriseOptional.get();

        // Vérifier si le tuteur existe
        Optional<TuteurPFE> tuteurPFEOptional = tuteurPFERepository.findById(tuteurStage);
        if (tuteurPFEOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Tuteur non trouvé");
        }
        TuteurPFE tuteurPFE = tuteurPFEOptional.get();
        try {
            // Vérifier et créer le dossier d'upload si nécessaire
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Sauvegarder le fichier PDF
            String fileName = fichierPDF.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(fichierPDF.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Créer et sauvegarder la convention
            ConventionStagePFE convention = new ConventionStagePFE();
            convention.setEtudiant(etudiant);
            convention.setEntreprise(entreprise);

            convention.setTuteurPFE(tuteurPFE);

            convention.setCahierDeCharge(cahierDeCharge);
            convention.setMaterielDeRealisation(materielDeRealisation);
            convention.setMaterielALaDispositionEtudiant(materielALaDispositionEtudiant);

            convention.setFavorable(0);

           // convention.setDateDebut(dateDebut);
           // convention.setDateFin(dateFin);
            convention.setDateDepot(new Date());
            convention.setFichierPDFNom(fileName);
            convention.setFichierPDFChemin(filePath.toString());
            convention.setValideeService(0);
            convention.setAnnulee(0);

            ConventionStagePFE savedConvention = conventionStagePFEService.saveConvetionStagePFE(convention);
            return ResponseEntity.ok(savedConvention);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Erreur lors du téléchargement du fichier.");
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
