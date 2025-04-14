package com.example.Back.Conventions.Controllers;

import com.example.Back.Auth.Models.User;
import com.example.Back.Auth.Repositories.UserRepository;
import com.example.Back.Conventions.Models.ConventionStageEte;
import com.example.Back.Conventions.Repositories.ConventionStageEteRepository;
import com.example.Back.Conventions.Services.ConventionStageEteService;
import com.example.Back.Entreprises.Models.Entreprise;
import com.example.Back.Entreprises.Repositories.EntreprisesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.Optional;


import java.io.IOException;
import java.nio.file.*;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/conventionStagEte")
public class ConventionStageEteController {

    private final ConventionStageEteService conventionStageEteService;
    private final ConventionStageEteRepository conventionStageEteRepository;
    private final UserRepository userRepository;
    private final EntreprisesRepository entreprisesRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    public ConventionStageEteController(ConventionStageEteService conventionStageEteService, ConventionStageEteRepository conventionRepository, UserRepository userRepository, EntreprisesRepository entreprisesRepository) {
        this.conventionStageEteService = conventionStageEteService;
        this.conventionStageEteRepository = conventionRepository;
        this.userRepository = userRepository;
        this.entreprisesRepository = entreprisesRepository;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createConvention(
            @RequestParam("etudiantId") Long etudiantId,
            @RequestParam("tuteurStage") String tuteurStage,
            @RequestParam("entrepriseId") Long entrepriseId,

           /* @RequestParam("etablissement") String etablissement,
            @RequestParam("adresse") String adresse,
            @RequestParam("representePar") String representePar,
            @RequestParam("email") String email,
            @RequestParam("telephone") String telephone,**/
            @RequestParam("dateDebut")  @DateTimeFormat(pattern = "yyyy-MM-dd") Date dateDebut,
            @RequestParam("dateFin")  @DateTimeFormat(pattern = "yyyy-MM-dd") Date dateFin,
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
            ConventionStageEte convention = new ConventionStageEte();
            convention.setEtudiant(etudiant);
            convention.setEntreprise(entreprise);
          /**  convention.setEtablissement(etablissement);
            convention.setAdresse(adresse);
            convention.setRepresentePar(representePar);
            convention.setEmail(email);
            convention.setTelephone(telephone);**/
            convention.setTuteurStage(tuteurStage);

            convention.setDateDebut(dateDebut);
            convention.setDateFin(dateFin);
            convention.setDateDepot(new Date());
            convention.setFichierPDFNom(fileName);
            convention.setFichierPDFChemin(filePath.toString());
            convention.setValideeService(0);
            convention.setValideeDirection(0);
            convention.setAnnulee(0);

            ConventionStageEte savedConvention = conventionStageEteRepository.save(convention);
            return ResponseEntity.ok(savedConvention);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Erreur lors du téléchargement du fichier.");
        }
    }
    @PostMapping("/uploadPreuveAnnulation/{conventionId}")
    public ResponseEntity<?> uploadPreuveAnnulation(
                    @PathVariable Long conventionId,
            @RequestParam("preuveAnnulation") MultipartFile preuveAnnulation) {

        // Trouver la convention
        Optional<ConventionStageEte> conventionOptional = conventionStageEteRepository.findById(conventionId);
        if (conventionOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Convention non trouvée");
        }
        ConventionStageEte convention = conventionOptional.get();

        try {
            // Vérifier et créer le dossier d'upload si nécessaire
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Générer un nom de fichier unique pour éviter les collisions
            String fileName = "preuve_annulation_" + conventionId + "_" +
                    System.currentTimeMillis() +
                    "." + getFileExtension(preuveAnnulation.getOriginalFilename());

            Path filePath = uploadPath.resolve(fileName);
            Files.copy(preuveAnnulation.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Mettre à jour la convention avec les infos de la preuve
            convention.setPreuveAnnulationNom(fileName);
            convention.setPreuveAnnulationChemin(filePath.toString());
            // Note: On ne change pas annulee ici (reste à 0)

            conventionStageEteRepository.save(convention);

            return ResponseEntity.ok("Preuve d'annulation uploadée avec succès");
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Erreur lors du téléchargement du fichier.");
        }
    }

    @PutMapping("/annuler/{conventionId}")
    public ResponseEntity<?> annulerConvention(@PathVariable Long conventionId) {
        Optional<ConventionStageEte> conventionOptional = conventionStageEteRepository.findById(conventionId);
        if (conventionOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Convention non trouvée");
        }
        ConventionStageEte convention = conventionOptional.get();
        // 2. Vérifier si une preuve existe déjà
        if (convention.getPreuveAnnulationNom() == null || convention.getPreuveAnnulationNom().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("Annulation impossible : aucune preuve d'annulation n'a été uploadée pour cette convention ");
        }

        // 3. Vérifier si la convention n'est pas déjà annulée
        if (convention.getAnnulee() == 1) {
            return ResponseEntity.badRequest()
                    .body("La convention est déjà annulée");
        }

        // 4. Mettre à jour le statut
        convention.setAnnulee(1); // 1 = annulée
        conventionStageEteRepository.save(convention);

        return ResponseEntity.ok("Convention annulée avec succès");
    }
    @PutMapping("/refuserAnnulation/{conventionId}")
    public ResponseEntity<?> refuserAnnulation(@PathVariable Long conventionId) {
        Optional<ConventionStageEte> conventionOptional = conventionStageEteRepository.findById(conventionId);
        if (conventionOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Convention non trouvée");
        }
        ConventionStageEte convention = conventionOptional.get();
        // 2. Vérifier si une preuve existe déjà
        if (convention.getPreuveAnnulationNom() == null || convention.getPreuveAnnulationNom().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("Annulation impossible : aucune preuve d'annulation n'a été uploadée pour cette convention ");
        }

        // 3. Vérifier si la convention n'est pas annulée
        if (convention.getAnnulee() == 1) {
            return ResponseEntity.badRequest()
                    .body("Cette convention est annulée");
        }
        if (convention.getAnnulee() == -1) {
            return ResponseEntity.badRequest()
                    .body("Annulation déja réfusée");
        }

        // 4. Mettre à jour le statut
        convention.setAnnulee(-1); //
        conventionStageEteRepository.save(convention);

        return ResponseEntity.ok("Annulation refusée avec succes (preuve non acceptée)");
    }
    // Méthode utilitaire pour extraire l'extension du fichier
    private String getFileExtension(String filename) {
        if (filename == null || filename.lastIndexOf(".") == -1) {
            return "";
        }
        return filename.substring(filename.lastIndexOf(".") + 1);
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


    @GetMapping("/getMyConventions/{id}")
    public List<ConventionStageEte> getConventionsByEtudiant(@PathVariable("id" ) Long etudiantId) {
        User etudiant = userRepository.findById(etudiantId).orElse(null);
        if (etudiant == null) {
            throw new RuntimeException("Étudiant non trouvé !");
        }
        return conventionStageEteRepository.findByEtudiant(etudiant);
    }
    @PutMapping("/ValiderConvention/{id}")
    public ResponseEntity<?> ValiderConvention(@PathVariable Long id)
    {
        Optional<ConventionStageEte> conventionOptional = conventionStageEteRepository.findById(id);
        if (conventionOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Convention non trouvée");
        }
        ConventionStageEte convention = conventionOptional.get();
        if (convention.getValideeService() == -1) {
            return ResponseEntity.badRequest().body("Cette convention n'est pas validée.");
        }
        if (convention.getValideeService() ==1 ) {
          return ResponseEntity.badRequest().body("Cette convention est déja validée");
        }
        convention.setValideeService(1);
        conventionStageEteRepository.save(convention);
        return ResponseEntity.ok("Convention validée avec succes");
    }
    @PutMapping("/RefuserConvention/{id}")
    public ResponseEntity<?> RefuserConvention(@PathVariable Long id)
    {
        Optional<ConventionStageEte> conventionOptional = conventionStageEteRepository.findById(id);
        if (conventionOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Convention non trouvée");
        }
        ConventionStageEte convention = conventionOptional.get();
        if (convention.getValideeService() == 1) {
            return ResponseEntity.badRequest().body("Cette convention a été validée précedemment");
        }
        if (convention.getValideeService() ==-1 ) {
            return ResponseEntity.badRequest().body("Cette convention est déja refusée");
        }
        convention.setValideeService(-1);
        conventionStageEteRepository.save(convention);
        return ResponseEntity.ok("Convention refusée avec succes");
    }
    @GetMapping("/ConventionsAvecPreuveNonAnnulees")
    public ResponseEntity<List<ConventionStageEte>> getConventionsAvecPreuveNonAnnulees() {
        List<ConventionStageEte> conventions = conventionStageEteService.getConventionsAvecPreuveMaisNonAnnulees();
        return ResponseEntity.ok(conventions);
    }
    @GetMapping("/getConventions")
    public ResponseEntity<List<ConventionStageEte>> getConventions() {
        List<ConventionStageEte> conventions = conventionStageEteRepository.findAll();
        return ResponseEntity.ok(conventions);
    }
    @GetMapping("/downloadPreuveAnnulation/{conventionId}")
    public ResponseEntity<Resource> downloadPreuveAnnulation(@PathVariable Long conventionId) {
        Optional<ConventionStageEte> conventionOptional = conventionStageEteRepository.findById(conventionId);
        if (conventionOptional.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        ConventionStageEte convention = conventionOptional.get();

        String fileName = convention.getPreuveAnnulationNom();
        if (fileName == null || fileName.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        try {
            Path filePath = Paths.get(uploadDir).resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists() || !resource.isReadable()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (MalformedURLException e) {
            return ResponseEntity.internalServerError().build();
        }
    }


}