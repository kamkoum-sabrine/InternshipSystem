package com.example.Back.Conventions.Controllers;

import com.example.Back.Auth.Models.User;
import com.example.Back.Auth.Repositories.UserRepository;
import com.example.Back.Conventions.Models.ConventionStageEte;
import com.example.Back.Conventions.Models.ConventionStagePFE;
import com.example.Back.Conventions.Models.RefusConventionDTO;
import com.example.Back.Conventions.Models.TuteurPFE;
import com.example.Back.Conventions.Repositories.ConventionStageEteRepository;
import com.example.Back.Conventions.Repositories.ConventionStagePFERepository;
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

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@RestController
@RequestMapping("/api/conventionStagPFE")
public class ConventionStagePFEController {
    private final ConventionStagePFEService conventionStagePFEService;
    private final UserRepository userRepository;
    private final EntreprisesRepository entreprisesRepository;
    private final TuteurPFERepository tuteurPFERepository;
    private final ConventionStagePFERepository conventionStagePFERepository;


    @Value("${file.upload-dir}/conventionsPFE")
    private String uploadDir;

    @Autowired
    public ConventionStagePFEController(ConventionStagePFEService conventionStagePFEService,
                                        UserRepository userRepository, EntreprisesRepository entreprisesRepository,
                                        TuteurPFERepository tuteurPFERepository, ConventionStagePFERepository conventionStagePFERepository) {
        this.conventionStagePFEService = conventionStagePFEService;
        this.userRepository = userRepository;
        this.entreprisesRepository = entreprisesRepository;
        this.tuteurPFERepository = tuteurPFERepository;
        this.conventionStagePFERepository = conventionStagePFERepository;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createConventionPFE(
            @RequestParam("etudiantId") Long etudiantId,
            @RequestParam("tuteurStage") Long tuteurStage,
            @RequestParam("entrepriseId") Long entrepriseId,
            @RequestParam("lieu") String lieu,
            @RequestParam("intituleSujet") String intituleSujet,
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

            convention.setIntituleSujet(intituleSujet);
            convention.setCahierDeCharge(cahierDeCharge);
            convention.setMaterielDeRealisation(materielDeRealisation);
            convention.setMaterielALaDispositionEtudiant(materielALaDispositionEtudiant);

            convention.setValideeDirection(0);

           // convention.setDateDebut(dateDebut);
           // convention.setDateFin(dateFin);
            convention.setDateDepot(new Date());
            convention.setFichierPDFNom(fileName);
            convention.setFichierPDFChemin(filePath.toString());
            convention.setValideeService(0);
            convention.setValideeDirection(0);
            convention.setValideeDirectionEnicar(0);
            convention.setValideeChefDepartement(0);
            convention.setValideeComite(0);
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

    @GetMapping("/getMyConventions/{id}")
    public List<ConventionStagePFE> getConventionsByEtudiant(@PathVariable("id" ) Long etudiantId) {
        User etudiant = userRepository.findById(etudiantId).orElse(null);
        if (etudiant == null) {
            throw new RuntimeException("Étudiant non trouvé !");
        }
        return conventionStagePFERepository.findByEtudiant(etudiant);
    }

    @PostMapping("/uploadPreuveAnnulation/{conventionId}")
    public ResponseEntity<?> uploadPreuveAnnulation(
            @PathVariable Long conventionId,
            @RequestParam("preuveAnnulation") MultipartFile preuveAnnulation) {

        // Trouver la convention
        Optional<ConventionStagePFE> conventionOptional = conventionStagePFERepository.findById(conventionId);
        if (conventionOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Convention non trouvée");
        }
        ConventionStagePFE convention = conventionOptional.get();

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

            conventionStagePFERepository.save(convention);

            return ResponseEntity.ok("Preuve d'annulation uploadée avec succès");
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Erreur lors du téléchargement du fichier.");
        }
    }

    @PutMapping("/annuler/{conventionId}")
    public ResponseEntity<?> annulerConvention(@PathVariable Long conventionId) {
        Optional<ConventionStagePFE> conventionOptional = conventionStagePFERepository.findById(conventionId);
        if (conventionOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Convention non trouvée");
        }
        ConventionStagePFE convention = conventionOptional.get();
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
        conventionStagePFERepository.save(convention);

        return ResponseEntity.ok("Convention annulée avec succès");
    }
    @PutMapping("/refuserAnnulation/{conventionId}")
    public ResponseEntity<?> refuserAnnulation(@PathVariable Long conventionId) {
        Optional<ConventionStagePFE> conventionOptional = conventionStagePFERepository.findById(conventionId);
        if (conventionOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Convention non trouvée");
        }
        ConventionStagePFE convention = conventionOptional.get();
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
        conventionStagePFERepository.save(convention);

        return ResponseEntity.ok("Annulation refusée avec succes (preuve non acceptée)");
    }
    // Méthode utilitaire pour extraire l'extension du fichier
    private String getFileExtension(String filename) {
        if (filename == null || filename.lastIndexOf(".") == -1) {
            return "";
        }
        return filename.substring(filename.lastIndexOf(".") + 1);
    }

    @GetMapping("/getConventions")
    public ResponseEntity<List<ConventionStagePFE>> getConventions() {
        List<ConventionStagePFE> conventions = conventionStagePFERepository.findAll();
        return ResponseEntity.ok(conventions);
    }
    @PutMapping("/ValiderConvention/{id}")
    public ResponseEntity<?> ValiderConvention(@PathVariable Long id)
    {
        Optional<ConventionStagePFE> conventionOptional = conventionStagePFERepository.findById(id);
        if (conventionOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Convention non trouvée");
        }
        ConventionStagePFE convention = conventionOptional.get();
        /** if (convention.getValideeService() == -1) {
         return ResponseEntity.badRequest().body("Cette convention n'est pas validée.");
         }
         if (convention.getValideeService() ==1 ) {
         return ResponseEntity.badRequest().body("Cette convention est déja validée");
         }**/
        convention.setValideeService(1);
        conventionStagePFERepository.save(convention);
        Map<String, Object> response = new HashMap<>();


        response.put("message", "Convention validée avec succes");
        response.put("status", HttpStatus.ACCEPTED.value());
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
        //  return ResponseEntity.ok("Convention validée avec succes");
    }


    @PutMapping("/RefuserConvention/{id}")
    public ResponseEntity<?> RefuserConvention(@PathVariable Long id,  @RequestBody RefusConventionDTO dto)
    {
        Optional<ConventionStagePFE> conventionOptional = conventionStagePFERepository.findById(id);
        if (conventionOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Convention non trouvée");
        }
        ConventionStagePFE convention = conventionOptional.get();
        /** if (convention.getValideeService() == 1) {
         return ResponseEntity.badRequest().body("Cette convention a été validée précedemment");
         }
         if (convention.getValideeService() ==-1 ) {
         return ResponseEntity.badRequest().body("Cette convention est déja refusée");
         }**/
        convention.setValideeService(-1);
        String remarques = dto.getRemarquesService();
        convention.setRemarques(remarques);
        conventionStagePFERepository.save(convention);
        Map<String, Object> response = new HashMap<>();


        response.put("message", "Convention refusée avec succes");
        response.put("status", HttpStatus.ACCEPTED.value());
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
        // return ResponseEntity.ok("Convention refusée avec succes");
    }


    @PutMapping("/ValiderConventionChefDepartement/{id}")
    public ResponseEntity<?> ValiderConventionChefDepartement(@PathVariable Long id)
    {
        Optional<ConventionStagePFE> conventionOptional = conventionStagePFERepository.findById(id);
        if (conventionOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Convention non trouvée");
        }
        ConventionStagePFE convention = conventionOptional.get();
        /** if (convention.getValideeService() == -1) {
         return ResponseEntity.badRequest().body("Cette convention n'est pas validée.");
         }
         if (convention.getValideeService() ==1 ) {
         return ResponseEntity.badRequest().body("Cette convention est déja validée");
         }**/
        convention.setValideeChefDepartement(1);
        conventionStagePFERepository.save(convention);
        Map<String, Object> response = new HashMap<>();


        response.put("message", "Convention validée avec succes");
        response.put("status", HttpStatus.ACCEPTED.value());
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
        //  return ResponseEntity.ok("Convention validée avec succes");
    }


    @PutMapping("/RefuserConventionDirectionEnicar/{id}")
    public ResponseEntity<?> RefuserConventionDirectionEnicar(@PathVariable Long id)
    {
        Optional<ConventionStagePFE> conventionOptional = conventionStagePFERepository.findById(id);
        if (conventionOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Convention non trouvée");
        }
        ConventionStagePFE convention = conventionOptional.get();
        /** if (convention.getValideeService() == 1) {
         return ResponseEntity.badRequest().body("Cette convention a été validée précedemment");
         }
         if (convention.getValideeService() ==-1 ) {
         return ResponseEntity.badRequest().body("Cette convention est déja refusée");
         }**/
        convention.setValideeDirectionEnicar(-1);
       // String remarques = dto.getRemarquesService();
       // convention.setRemarques(remarques);
        conventionStagePFERepository.save(convention);
        Map<String, Object> response = new HashMap<>();


        response.put("message", "Convention refusée avec succes");
        response.put("status", HttpStatus.ACCEPTED.value());
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
        // return ResponseEntity.ok("Convention refusée avec succes");
    }


    @PutMapping("/ValiderConventionDirectionEnicar/{id}")
    public ResponseEntity<?> ValiderConventionDirectionEnicar(@PathVariable Long id)
    {
        Optional<ConventionStagePFE> conventionOptional = conventionStagePFERepository.findById(id);
        if (conventionOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Convention non trouvée");
        }
        ConventionStagePFE convention = conventionOptional.get();
        /** if (convention.getValideeService() == -1) {
         return ResponseEntity.badRequest().body("Cette convention n'est pas validée.");
         }
         if (convention.getValideeService() ==1 ) {
         return ResponseEntity.badRequest().body("Cette convention est déja validée");
         }**/
        try {
            // Valider
            convention.setValideeDirectionEnicar(1);

            // Signature PDF
            String cheminOriginal = convention.getFichierPDFChemin();
            String nomPDF = convention.getFichierPDFNom();
            String signaturePath = "src/main/resources/static/images/signature.png";
            //String dossierDestination = "src/main/resources/static/images/signature_direction.png"; // À adapter
            String dossierDestination = "uploads/conventionsSignes";

            // Créer le dossier s'il n'existe pas
            File dir = new File(dossierDestination);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            // Ajouter la signature
            System.out.println("chemiiiiiiiiiiinnn ");

            String nouveauChemin = PDFSignatureUtils.ajouterSignatureDirectionPFE(cheminOriginal, nomPDF, signaturePath, dossierDestination);
            System.out.println("chemiiiiiiiiiiinnn "+nouveauChemin);
            System.out.println("✅ Nouveau chemin généré : " + nouveauChemin);
            File testFile = new File(nouveauChemin);
            System.out.println("📁 Existe-t-il ? " + testFile.exists());

            // Mise à jour de la convention
            convention.setFichierPDFChemin(nouveauChemin);
            convention.setFichierPDFNom("SIGNE_" + nomPDF);
            conventionStagePFERepository.save(convention);
            System.out.println(convention.getFichierPDFChemin());
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Convention validée et signée avec succès");
            response.put("status", HttpStatus.ACCEPTED.value());

            return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);

        } catch (Exception e) {
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de la signature : " + e.getMessage());
        }
    }


    @PutMapping("/RefuserConventionChefDepartement/{id}")
    public ResponseEntity<?> RefuserConventionChefDepartement(@PathVariable Long id)
    {
        Optional<ConventionStagePFE> conventionOptional = conventionStagePFERepository.findById(id);
        if (conventionOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Convention non trouvée");
        }
        ConventionStagePFE convention = conventionOptional.get();
        /** if (convention.getValideeService() == 1) {
         return ResponseEntity.badRequest().body("Cette convention a été validée précedemment");
         }
         if (convention.getValideeService() ==-1 ) {
         return ResponseEntity.badRequest().body("Cette convention est déja refusée");
         }**/
        convention.setValideeChefDepartement(-1);
        // String remarques = dto.getRemarquesService();
        // convention.setRemarques(remarques);
        conventionStagePFERepository.save(convention);
        Map<String, Object> response = new HashMap<>();


        response.put("message", "Convention refusée avec succes");
        response.put("status", HttpStatus.ACCEPTED.value());
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
        // return ResponseEntity.ok("Convention refusée avec succes");
    }


}
