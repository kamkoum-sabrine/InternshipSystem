package com.example.Back.Conventions.Services;

import com.example.Back.Conventions.Models.ConventionStageEte;
import com.example.Back.Conventions.Repositories.ConventionStageEteRepository;
import com.example.Back.Entreprises.Models.Entreprise;
import com.example.Back.Auth.Models.User;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class LettreAffectationService {

    private static final Logger logger = LoggerFactory.getLogger(LettreAffectationService.class);

    @Autowired
    private ConventionStageEteRepository conventionRepository;

    @Value("${file.upload-dir}/lettreAffectation")
    private String uploadDir;

    private Path fileStorageLocation;

    @PostConstruct
    public void init() {
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException(
                    "Impossible de créer le répertoire où les fichiers seront stockés.", ex);
        }
    }

    public ConventionStageEte generateAndStoreLettreAffectation(Long conventionId) {
        try {
            logger.info("Début de génération de lettre d'affectation pour la convention ID: {}", conventionId);

            ConventionStageEte convention = conventionRepository.findById(conventionId)
                    .orElseThrow(() -> {
                        String errorMsg = "Convention non trouvée avec l'ID: " + conventionId;
                        logger.error(errorMsg);
                        return new RuntimeException(errorMsg);
                    });

            logger.debug("Convention trouvée : {}", convention);

            if (convention.getEtudiant() == null) {
                String errorMsg = "Aucun étudiant associé à la convention ID: " + conventionId;
                logger.error(errorMsg);
                throw new RuntimeException(errorMsg);
            }

            if (convention.getEntreprise() == null) {
                String errorMsg = "Aucune entreprise associée à la convention ID: " + conventionId;
                logger.error(errorMsg);
                throw new RuntimeException(errorMsg);
            }

            String fileName = generateLettreAffectationPdf(convention);
            logger.info("PDF généré avec succès : {}", fileName);

            convention.setLettreAffectationNom(fileName);
            convention.setLettreAffectationChemin(fileStorageLocation.resolve(fileName).toString());

            ConventionStageEte savedConvention = conventionRepository.save(convention);
            logger.info("Convention mise à jour avec les infos du PDF");

            return savedConvention;
        } catch (Exception e) {
            logger.error("ERREUR lors de la génération de la lettre d'affectation", e);
            throw new RuntimeException("Échec de la génération du PDF: " + e.getMessage(), e);
        }
    }


    private String generateLettreAffectationPdf(ConventionStageEte convention) {
        String fileName = "lettre_affectation_" + convention.getId() + "_" + System.currentTimeMillis() + ".pdf";
        logger.debug("Génération du PDF: {}", fileName);

        Document document = new Document();
        FileOutputStream fos = null;

        try {
            fos = new FileOutputStream(fileStorageLocation.resolve(fileName).toFile());
            PdfWriter.getInstance(document, fos);
            document.open();

            logger.debug("Ajout des métadonnées...");
            addMetaData(document);

            logger.debug("Ajout du titre...");
            addTitle(document);

            logger.debug("Ajout du contenu...");
            addContent(document, convention);

            document.close();
            logger.debug("PDF généré avec succès");

            return fileName;
        } catch (Exception e) {
            logger.error("ERREUR lors de la génération du PDF", e);
            // Nettoyage en cas d'erreur
            if (document.isOpen()) {
                document.close();
            }
            // Suppression du fichier partiellement créé
            try {
                if (fos != null) {
                    fos.close();
                }
                Files.deleteIfExists(fileStorageLocation.resolve(fileName));
            } catch (IOException ioEx) {
                logger.error("Échec du nettoyage après erreur", ioEx);
            }
            throw new RuntimeException("Échec de la génération du PDF", e);
        }
    }

    private void addMetaData(Document document) {
        document.addTitle("Lettre d'affectation à un stage");
        document.addSubject("Affectation de stage");
        document.addKeywords("stage, affectation, ENICarthage");
        document.addAuthor("ENICarthage");
        document.addCreator("ENICarthage");
    }

    private void addTitle(Document document) throws DocumentException {
        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16, BaseColor.BLACK);

        Paragraph ministry = new Paragraph("Ministère de l'Enseignement Supérieur", titleFont);
        ministry.setAlignment(Element.ALIGN_CENTER);
        document.add(ministry);

        Paragraph ministry2 = new Paragraph("et de la Recherche Scientifique", titleFont);
        ministry2.setAlignment(Element.ALIGN_CENTER);
        document.add(ministry2);

        Paragraph university = new Paragraph("Université de Carthage", titleFont);
        university.setAlignment(Element.ALIGN_CENTER);
        document.add(university);

        document.add(Chunk.NEWLINE);

        Paragraph letterTitle = new Paragraph("Lettre d'affectation à un Stage", titleFont);
        letterTitle.setAlignment(Element.ALIGN_CENTER);
        document.add(letterTitle);

        document.add(Chunk.NEWLINE);
    }

    private void addContent(Document document, ConventionStageEte convention) throws DocumentException {
        User etudiant = convention.getEtudiant();
        Entreprise entreprise = convention.getEntreprise();

        Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 12, BaseColor.BLACK);
        Font boldFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, BaseColor.BLACK);

        // Objet
        Paragraph subject = new Paragraph("Objet : Affectation à un stage", boldFont);
        subject.setAlignment(Element.ALIGN_LEFT);
        document.add(subject);

        document.add(Chunk.NEWLINE);

        // Introduction
        Paragraph intro = new Paragraph("Dans le cadre de ses études à l'Ecole Nationale d'Ingénieurs de Carthage (ENICarthage),", normalFont);
        document.add(intro);

        document.add(Chunk.NEWLINE);

        // Informations étudiant
        Paragraph studentInfo = new Paragraph("l'étudiant(e) : ", normalFont);
        studentInfo.add(new Chunk(etudiant.getNom() + " " + etudiant.getPrenom(), boldFont));
        document.add(studentInfo);

        if (etudiant.getCin() != null) {
            Paragraph cinInfo = new Paragraph("CIN : ", normalFont);
            cinInfo.add(new Chunk(etudiant.getCin().toString(), boldFont));
         /**   cinInfo.add(new Chunk(", délivrée le " + formatDate(etudiant.getCinDateDelivrance()) +
                    " à : " + etudiant.getCinLieuDelivrance(), normalFont));**/
            document.add(cinInfo);
        }

        Paragraph niveauInfo = new Paragraph("Inscrit(e) en : ", normalFont);
        niveauInfo.add(new Chunk(etudiant.getNiveau() != null ? etudiant.getNiveau().toString() : "Non spécifié", boldFont));
        document.add(niveauInfo);

        document.add(Chunk.NEWLINE);

        // Informations stage
        Paragraph stageInfo = new Paragraph("est affecté(e) à un stage à : ", normalFont);
        stageInfo.add(new Chunk(entreprise.getNom(), boldFont));
        document.add(stageInfo);

        Paragraph datesInfo = new Paragraph("et ce, du ", normalFont);
        datesInfo.add(new Chunk(formatDate(convention.getDateDebut()), boldFont));
        datesInfo.add(new Chunk(" au ", normalFont));
        datesInfo.add(new Chunk(formatDate(convention.getDateFin()), boldFont));
        document.add(datesInfo);

        document.add(Chunk.NEWLINE);
        document.add(Chunk.NEWLINE);

        // Date et signature
        Paragraph date = new Paragraph("Tunis, le : " + formatDate(new Date()), normalFont);
        document.add(date);

        document.add(Chunk.NEWLINE);
        document.add(Chunk.NEWLINE);

        Paragraph signature = new Paragraph("Directeur de l'ENICarthage", normalFont);
        signature.setAlignment(Element.ALIGN_RIGHT);
        document.add(signature);

        Paragraph directorName = new Paragraph("Hassen Zairi", boldFont);
        directorName.setAlignment(Element.ALIGN_RIGHT);
        document.add(directorName);
    }

    private String formatDate(Date date) {
        if (date == null) return "";
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        return formatter.format(date);
    }

    public Resource loadLettreAffectationAsResource(String filePath) {
        try {
            Path path = Paths.get(filePath).normalize();
            logger.debug("Chargement du fichier PDF: {}", path);

            Resource resource = new UrlResource(path.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                String errorMsg = "Fichier PDF non trouvé: " + filePath;
                logger.error(errorMsg);
                throw new RuntimeException(errorMsg);
            }
        } catch (MalformedURLException ex) {
            logger.error("URL du fichier invalide: " + filePath, ex);
            throw new RuntimeException("Erreur avec le fichier PDF", ex);
        }
    }
}