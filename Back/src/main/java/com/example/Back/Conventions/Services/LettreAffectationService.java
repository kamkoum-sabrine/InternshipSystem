package com.example.Back.Conventions.Services;

import com.example.Back.Conventions.Models.ConventionStageEte;
import com.example.Back.Conventions.Models.ConventionStagePFE;
import com.example.Back.Conventions.Repositories.ConventionStageEteRepository;
import com.example.Back.Conventions.Repositories.ConventionStagePFERepository;
import com.example.Back.Entreprises.Models.Entreprise;
import com.example.Back.Auth.Models.User;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
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

    @Autowired
    private ConventionStagePFERepository conventionPFERepository;

    @Value("${file.upload-dir}/lettreAffectation")
    private String uploadDir;

    @Value("${signature.directrice.path}")
    private String signaturePath;

    private Path fileStorageLocation;

    @PostConstruct
    public void init() {
        try {
            this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
            Files.createDirectories(this.fileStorageLocation);
            logger.info("Répertoire de stockage initialisé : {}", this.fileStorageLocation);
        } catch (Exception ex) {
            logger.error("ERREUR CRITIQUE: Impossible de créer le répertoire de stockage", ex);
            throw new RuntimeException("Initialisation du service échouée", ex);
        }
    }

    public ConventionStageEte generateAndStoreSignedLettreAffectation(Long conventionId) {
        try {
            logger.info("Début de génération de lettre d'affectation signée pour la convention ID: {}", conventionId);

            ConventionStageEte convention = conventionRepository.findById(conventionId)
                    .orElseThrow(() -> new RuntimeException("Convention non trouvée avec l'ID: " + conventionId));

            validateConvention(convention);

            // Générer le nom du fichier signé
            String signedFileName = "lettre_affectation_signe_" + conventionId + "_" + System.currentTimeMillis() + ".pdf";
            Path signedFilePath = fileStorageLocation.resolve(signedFileName);

            // Générer directement le PDF signé
            generateSignedPdf(convention, signedFilePath.toFile());

            // Mettre à jour la convention avec le chemin du PDF signé
            convention.setLettreAffectationNom(signedFileName);
            convention.setLettreAffectationChemin(signedFilePath.toString());

            // Enregistrer la convention avec le PDF signé
            return conventionRepository.save(convention);

        } catch (Exception e) {
            logger.error("ERREUR lors de la génération de la lettre d'affectation signée", e);
            throw new RuntimeException("Échec de la génération du PDF signé: " + e.getMessage(), e);
        }
    }

    public ConventionStagePFE generateAndStoreSignedLettreAffectationPFE(Long conventionId) {
        try {
            logger.info("Début de génération de lettre d'affectation signée pour la convention ID: {}", conventionId);

            ConventionStagePFE convention = conventionPFERepository.findById(conventionId)
                    .orElseThrow(() -> new RuntimeException("Convention non trouvée avec l'ID: " + conventionId));

            validateConventionPFE(convention);

            // Générer le nom du fichier signé
            String signedFileName = "lettre_affectation_signe_" + conventionId + "_" + System.currentTimeMillis() + ".pdf";
            Path signedFilePath = fileStorageLocation.resolve(signedFileName);

            // Générer directement le PDF signé
            generateSignedPdfPFE(convention, signedFilePath.toFile());

            // Mettre à jour la convention avec le chemin du PDF signé
            convention.setLettreAffectationNom(signedFileName);
            convention.setLettreAffectationChemin(signedFilePath.toString());

            // Enregistrer la convention avec le PDF signé
            return conventionPFERepository.save(convention);

        } catch (Exception e) {
            logger.error("ERREUR lors de la génération de la lettre d'affectation signée", e);
            throw new RuntimeException("Échec de la génération du PDF signé: " + e.getMessage(), e);
        }
    }
    private void validateConventionPFE(ConventionStagePFE convention) {
        if (convention.getEtudiant() == null) {
            throw new RuntimeException("Aucun étudiant associé à la convention");
        }
        if (convention.getEntreprise() == null) {
            throw new RuntimeException("Aucune entreprise associée à la convention");
        }
    }
    private void validateConvention(ConventionStageEte convention) {
        if (convention.getEtudiant() == null) {
            throw new RuntimeException("Aucun étudiant associé à la convention");
        }
        if (convention.getEntreprise() == null) {
            throw new RuntimeException("Aucune entreprise associée à la convention");
        }
    }

    private void generateSignedPdfPFE(ConventionStagePFE convention, File outputFile) throws Exception {
        Document document = new Document();
        PdfWriter writer = null;

        try {
            writer = PdfWriter.getInstance(document, new FileOutputStream(outputFile));
            document.open();

            // Ajouter le contenu standard
            addMetaData(document);
            addTitle(document);
            addContentPFE(document, convention);

            // Ajouter la signature directement
            addSignature(document, writer);

        } finally {
            if (document != null && document.isOpen()) {
                document.close();
            }
        }
    }


    private void generateSignedPdf(ConventionStageEte convention, File outputFile) throws Exception {
        Document document = new Document();
        PdfWriter writer = null;

        try {
            writer = PdfWriter.getInstance(document, new FileOutputStream(outputFile));
            document.open();

            // Ajouter le contenu standard
            addMetaData(document);
            addTitle(document);
            addContent(document, convention);

            // Ajouter la signature directement
            addSignature(document, writer);

        } finally {
            if (document != null && document.isOpen()) {
                document.close();
            }
        }
    }

    private void addSignature(Document document, PdfWriter writer) throws Exception {
        PdfContentByte canvas = writer.getDirectContentUnder();

        // Ajouter l'image de signature
        Image signature = Image.getInstance(signaturePath);
        signature.scaleAbsolute(120, 60);
        signature.setAbsolutePosition(450, 300);
        canvas.addImage(signature);

        // Ajouter la date de signature
        BaseFont bf = BaseFont.createFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
        canvas.beginText();
        canvas.setFontAndSize(bf, 10);
        String dateSignature = new SimpleDateFormat("dd/MM/yyyy").format(new Date());
        canvas.showTextAligned(PdfContentByte.ALIGN_LEFT, "Fait à Tunis, le " + dateSignature, 450, 270, 0);
        canvas.endText();

        // Ajouter le titre de la directrice
        canvas.beginText();
        canvas.setFontAndSize(bf, 10);
        //canvas.showTextAligned(PdfContentByte.ALIGN_LEFT, "La Directrice", 450, 190, 0);
        canvas.endText();
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

        Paragraph signature = new Paragraph("Directrice de l'ENICarthage", normalFont);
        signature.setAlignment(Element.ALIGN_RIGHT);
        document.add(signature);

        Paragraph directorName = new Paragraph("Houda BEN ATTIA SETTHOM", boldFont);
        directorName.setAlignment(Element.ALIGN_RIGHT);
        document.add(directorName);
    }


    private void addContentPFE(Document document, ConventionStagePFE convention) throws DocumentException {
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

       // Paragraph datesInfo = new Paragraph("et ce, du ", normalFont);
      //  datesInfo.add(new Chunk(formatDate(convention.getDateDebut()), boldFont));
     //   datesInfo.add(new Chunk(" au ", normalFont));
    //    datesInfo.add(new Chunk(formatDate(convention.getDateFin()), boldFont));
      //  document.add(datesInfo);

        document.add(Chunk.NEWLINE);
        document.add(Chunk.NEWLINE);

        // Date et signature
        Paragraph date = new Paragraph("Tunis, le : " + formatDate(new Date()), normalFont);
        document.add(date);

        document.add(Chunk.NEWLINE);
        document.add(Chunk.NEWLINE);

        Paragraph signature = new Paragraph("Directrice de l'ENICarthage", normalFont);
        signature.setAlignment(Element.ALIGN_RIGHT);
        document.add(signature);

        Paragraph directorName = new Paragraph("Houda BEN ATTIA SETTHOM", boldFont);
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