package com.example.Back.Conventions.Controllers;

import com.example.Back.Auth.Models.User;
import com.example.Back.Auth.Services.UserService;
import com.example.Back.Conventions.Services.TelechargerConventionService;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.util.Units;
import org.apache.poi.xwpf.usermodel.*;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTTblBorders;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTTblPr;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.STBorder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.apache.poi.xwpf.usermodel.XWPFTable;
import org.apache.poi.xwpf.usermodel.XWPFTableCell;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.util.Units;
import org.apache.commons.io.IOUtils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ByteArrayInputStream;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
        formData.put("Filière", etudiant.get().getFiliere());
        formData.put("N° CIN", String.valueOf(etudiant.get().getCin()));
        formData.put("Ntéléphone", etudiant.get().getLieuNaissance());
        formData.put("E-mail", etudiant.get().getEmail());
        formData.put("Niveau", etudiant.get().getNiveau());

        byte[] pdfBytes = telechargerConventionService.generateConventionPdf(formData);

        // Génération du Word
        byte[] wordBytes = generateProfessionalConvention(formData);



        // Retourner un téléchargement pour chaque fichier
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=convention_stage.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }
    private void handleCheckboxesDepartement(XWPFDocument doc, User etudiant) {
        // Déterminez l'état des cases
        boolean isInformatique = "Génie informatique".equals(etudiant.getDepartement());
        boolean isElectrique = "Génie électrique".equals(etudiant.getDepartement());
        boolean isIndustriel = "Génie industriel".equals(etudiant.getDepartement());
        final String CHECKED = "✓"; // ou "🗹" pour un style plus carré
        final String UNCHECKED = "□"; // ou "☐" si vous préférez
        // Map des replacements spécifiques aux cases
        Map<String, String> checkboxes = new HashMap<>();
        checkboxes.put("${INFORMATIQUE}", isInformatique ? CHECKED : UNCHECKED);
        checkboxes.put("${ELECTRIQUE}", isElectrique ? CHECKED : UNCHECKED);
        checkboxes.put("${INDUSTRIEL}", isIndustriel ? CHECKED : UNCHECKED);

        // Appliquez aux paragraphes
        for (XWPFParagraph p : doc.getParagraphs()) {
            String text = p.getText();
            if (text != null) {
                for (Map.Entry<String, String> entry : checkboxes.entrySet()) {
                    if (text.contains(entry.getKey())) {
                        replaceTextInParagraphDepartement(p, entry.getKey(), entry.getValue());
                    }
                }
            }
        }
    }

    private void replaceTextInParagraphDepartement(XWPFParagraph p, String placeholder, String value) {
        // Fusionne les runs si nécessaire
        String mergedText = p.getText();
        for (int i = p.getRuns().size() - 1; i >= 0; i--) {
            p.removeRun(i);
        }

        XWPFRun newRun = p.createRun();
        newRun.setText(mergedText.replace(placeholder, value));
    }
    private void handleCheckboxesFormation(XWPFDocument doc, User etudiant) {
        // Déterminez l'état des cases
        boolean isIngenieur = "Ingénieur".equals(etudiant.getFormation());
        boolean isMaster = "Master".equals(etudiant.getFormation());

         final String CHECKED = "✓"; // ou "🗹" pour un style plus carré
         final String UNCHECKED = "□"; // ou "☐" si vous préférez
        // Map des replacements spécifiques aux cases
        Map<String, String> checkboxes = new HashMap<>();
        checkboxes.put("${INGENIEUR}", isIngenieur ? CHECKED : UNCHECKED);
        checkboxes.put("${MASTER}", isMaster ? CHECKED : UNCHECKED);

        // Appliquez aux paragraphes
        for (XWPFParagraph p : doc.getParagraphs()) {
            String text = p.getText();
            if (text != null) {
                for (Map.Entry<String, String> entry : checkboxes.entrySet()) {
                    if (text.contains(entry.getKey())) {
                        replaceTextInParagraph(p, entry.getKey(), entry.getValue());
                    }
                }
            }
        }
    }

    private void replaceTextInParagraph(XWPFParagraph p, String placeholder, String value) {
        // Fusionne les runs si nécessaire
        String mergedText = p.getText();
        for (int i = p.getRuns().size() - 1; i >= 0; i--) {
            p.removeRun(i);
        }

        XWPFRun newRun = p.createRun();
        newRun.setText(mergedText.replace(placeholder, value));
    }
    @GetMapping("/convention/word/{id}")
    public ResponseEntity<byte[]> generateConvention(@PathVariable Long id) throws Exception  {
        // 1. Charger le template
        ClassPathResource resource = new ClassPathResource("templates/stage_ete_template.docx");
        XWPFDocument document = new XWPFDocument(OPCPackage.open(resource.getInputStream()));

        // 2. Récupérer les données de l'étudiant
        User etudiant = userService.findUserById(id).orElseThrow();

        // 3. Map des données à remplacer
        Map<String, String> replacements = new HashMap<>();
        replacements.put("${nom}", etudiant.getNom());
        replacements.put("${prenom}", etudiant.getPrenom());
        replacements.put("${filiere}", etudiant.getFiliere());
        replacements.put("${cin}", String.valueOf(etudiant.getCin()));
        replacements.put("${telephone}",String.valueOf(etudiant.getTelephone()));
        replacements.put("${email}",etudiant.getEmail());

        // 3. Gérer les cases à cocher
        handleCheckboxesFormation(document, etudiant); // Ou handleWordCheckboxes()
        handleCheckboxesDepartement(document, etudiant); // Ou handleWordCheckboxes()

        //replacements.put("${option}",etudiant.getOption());
      /**  // 4. Parcourir et remplacer les textes
        for (XWPFParagraph p : document.getParagraphs()) {
            replaceText(p, replacements);
        }

        for (XWPFTable tbl : document.getTables()) {
            for (XWPFTableRow row : tbl.getRows()) {
                for (XWPFTableCell cell : row.getTableCells()) {
                    for (XWPFParagraph p : cell.getParagraphs()) {
                        replaceText(p, replacements);
                    }
                }
            }
        }
**/
        replacePlaceholders(document, replacements);
        // 5. Générer le fichier de sortie
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        document.write(out);
        document.close();

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=convention_stage.docx")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(out.toByteArray());
    }
    private void replacePlaceholdersKeepingImages(XWPFDocument doc, Map<String, String> replacements) throws Exception {
        // 1. Liste toutes les images existantes
        List<XWPFPictureData> pictures = doc.getAllPictures();
        Map<String, byte[]> imageMap = new HashMap<>();

        for (XWPFPictureData picture : pictures) {
            imageMap.put(picture.getFileName(), picture.getData());
        }

        // 2. Fait le remplacement de texte normal
        replacePlaceholders(doc, replacements);

        // 3. Réinsère les images
        for (XWPFParagraph p : doc.getParagraphs()) {
            for (XWPFRun run : p.getRuns()) {
                if (run.getEmbeddedPictures().size() > 0) {
                    for (String fileName : imageMap.keySet()) {
                        try {
                            run.addPicture(
                                    new ByteArrayInputStream(imageMap.get(fileName)),
                                    getPictureType(fileName),
                                    fileName,
                                    Units.toEMU(100), // Largeur
                                    Units.toEMU(100)  // Hauteur
                            );
                        } catch (Exception e) {
                            // Gérer l'erreur silencieusement
                        }
                    }
                }
            }
        }
    }

    private int getPictureType(String fileName) {
        if (fileName.endsWith(".png")) return XWPFDocument.PICTURE_TYPE_PNG;
        if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) return XWPFDocument.PICTURE_TYPE_JPEG;
        return XWPFDocument.PICTURE_TYPE_PNG; // Par défaut
    }
    private void replacePlaceholders(XWPFDocument doc, Map<String, String> replacements) {
        // 1. Traiter tous les paragraphes principaux
        for (XWPFParagraph p : doc.getParagraphs()) {
            replaceInParagraph(p, replacements);
        }

        // 2. Traiter tous les tableaux et leurs cellules
        for (XWPFTable tbl : doc.getTables()) {
            for (XWPFTableRow row : tbl.getRows()) {
                for (XWPFTableCell cell : row.getTableCells()) {
                    for (XWPFParagraph p : cell.getParagraphs()) {
                        replaceInParagraph(p, replacements);
                    }
                }
            }
        }
    }
    // Méthode dédiée aux paragraphes
    private void replaceInParagraph(XWPFParagraph paragraph, Map<String, String> replacements) {
        // Fusionner les runs si nécessaire (évite les fragments)
        if (paragraph.getRuns().size() > 3) {
            String fullText = paragraph.getText();
            for (int i = paragraph.getRuns().size() - 1; i >= 0; i--) {
                paragraph.removeRun(i);
            }
            XWPFRun newRun = paragraph.createRun();
            newRun.setText(fullText);
        }

        // Remplacer les placeholders
        for (XWPFRun run : paragraph.getRuns()) {
            String text = run.getText(0);
            if (text != null && !text.isEmpty()) {
                for (Map.Entry<String, String> entry : replacements.entrySet()) {
                    if (text.contains(entry.getKey())) {
                        text = text.replace(entry.getKey(), entry.getValue());
                        run.setText(text, 0);
                        run.setFontSize(10); // Maintenir une taille cohérente
                    }
                }
            }
        }
    }

    private void replaceText(XWPFParagraph paragraph, Map<String, String> replacements) {
        String text = paragraph.getText();

        if (text != null && !text.isEmpty()) {
            for (Map.Entry<String, String> entry : replacements.entrySet()) {
                if (text.contains(entry.getKey())) {
                    text = text.replace(entry.getKey(), entry.getValue());

                    // Supprimer tous les runs existants
                    for (int i = paragraph.getRuns().size() - 1; i >= 0; i--) {
                        paragraph.removeRun(i);
                    }

                    // Ajouter le nouveau texte avec le style conservé
                    XWPFRun newRun = paragraph.createRun();
                    newRun.setText(text);
                    // Conserver le style si nécessaire
                    if (!paragraph.getRuns().isEmpty()) {
                        XWPFRun firstRun = paragraph.getRuns().get(0);
                        newRun.setFontFamily(firstRun.getFontFamily());
                        newRun.setFontSize(firstRun.getFontSize());
                        newRun.setBold(firstRun.isBold());
                        newRun.setItalic(firstRun.isItalic());
                    }
                    break;
                }
            }
        }
    }
    @GetMapping("/convention/word2/{id}")
    public ResponseEntity<byte[]> generateWord(@PathVariable Long id) throws IOException {
        if (id == null) {
            return ResponseEntity.badRequest().body(null);
        }

        Optional<User> etudiant = userService.findUserById(id);

        if (etudiant.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        Map<String, String> formData = new HashMap<>();
        formData.put("Nom", etudiant.get().getNom());
        formData.put("Prénom", etudiant.get().getPrenom());
        formData.put("Filière", etudiant.get().getFiliere());
        formData.put("N° CIN", String.valueOf(etudiant.get().getCin()));
        formData.put("Téléphone", etudiant.get().getLieuNaissance());
        formData.put("E-mail", etudiant.get().getEmail());
        formData.put("Niveau", etudiant.get().getNiveau());

        byte[] wordBytes = generateProfessionalConvention(formData);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=convention_stage.docx")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(wordBytes);
    }

    private byte[] generateProfessionalConvention(Map<String, String> formData) throws IOException {
        XWPFDocument document = new XWPFDocument();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        try {
            // 1. Charger l'image depuis les ressources
            InputStream logoStream = this.getClass().getResourceAsStream("/static/images/Logo_ENICarthage-removebg-preview.png");
            if (logoStream == null) {
                throw new IOException("Logo file not found in resources");
            }

            // 2. Ajouter l'en-tête avec logo
            addHeaderWithLogo(document, logoStream);

            addTitle(document, "CONVENTION - STAGE D'ÉTÉ");
            addArticle1(document, formData);
            addArticle(document, "Article 2", "Le stage d'été à caractère professionnel et obligatoire...");
            addArticle(document, "Article 3", "L'étudiant stagiaire reste affilié au régime de sécurité sociale...");
            addArticle(document, "Article 4", "Le Directeur de l'ENICarthage et le représentant de l'établissement...");
            addArticle(document, "Article 5", "A l'issue du stage, l'étudiant stagiaire est tenu de fournir...");
            addFooter(document);
           // document.write(outputStream);
           // document.close();
           // logoStream.close();

        } catch (InvalidFormatException e) {
            throw new IOException("Failed to add image to Word document: " + e.getMessage(), e);
        } finally {
            document.write(outputStream);
            document.close();
        }

        return outputStream.toByteArray();
    }


    private void addHeaderWithLogo(XWPFDocument document, InputStream logoStream) throws IOException, InvalidFormatException {
        // Créer un tableau invisible pour la mise en page
        XWPFTable table = document.createTable(1, 2);

        // Configuration du tableau pour qu'il soit "invisible"
      //  table.setTableAlignment(TableAlignment.LEFT);
        table.setWidth("100%");

        // Supprimer les bordures du tableau
      //  table.getCTTbl().getTblPr().unsetTblBorders();
        // Supprimer les bordures du tableau (méthode correcte)
        CTTblPr tblPr = table.getCTTbl().getTblPr();
        CTTblBorders borders = tblPr.addNewTblBorders();
        borders.addNewBottom().setVal(STBorder.NONE);
        borders.addNewLeft().setVal(STBorder.NONE);
        borders.addNewRight().setVal(STBorder.NONE);
        borders.addNewTop().setVal(STBorder.NONE);
        borders.addNewInsideH().setVal(STBorder.NONE);
        borders.addNewInsideV().setVal(STBorder.NONE);
        // Cellule du logo (20% de largeur)
        XWPFTableCell logoCell = table.getRow(0).getCell(0);
        logoCell.setWidth("20%");
        logoCell.getCTTc().addNewTcPr().addNewNoWrap();

        // Ajouter l'image
        addImageToCell(logoCell, logoStream, XWPFDocument.PICTURE_TYPE_PNG);

        // Cellule du texte (80% de largeur)
        XWPFTableCell textCell = table.getRow(0).getCell(1);
        textCell.setWidth("80%");
        textCell.setVerticalAlignment(XWPFTableCell.XWPFVertAlign.CENTER);

        // Texte de l'en-tête
        XWPFParagraph paragraph = textCell.addParagraph();
        paragraph.setAlignment(ParagraphAlignment.LEFT);
        paragraph.setSpacingBefore(0);
        paragraph.setSpacingAfter(0);

        XWPFRun run = paragraph.createRun();
        run.setText("République Tunisienne");
        run.addBreak();
        run.setText("Ministère de l'Enseignement Supérieur et de la");
        run.addBreak();
        run.setText("Recherche Scientifique");
        run.addBreak();
        run.addBreak();
        run.setText("Université de Carthage");
        run.addBreak();
        run.setText("École Nationale d'Ingénieurs de Carthage");
        run.setFontSize(10);
    }

    private void addImageToCell(XWPFTableCell cell, InputStream imageStream, int pictureType)
            throws IOException, InvalidFormatException {

        XWPFParagraph paragraph = cell.addParagraph();
        paragraph.setAlignment(ParagraphAlignment.LEFT);
        paragraph.setSpacingBefore(0);
        paragraph.setSpacingAfter(0);

        XWPFRun run = paragraph.createRun();

        // Dimensions du logo (à ajuster selon vos besoins)
        int width = 80;
        int height = 80;

        // Lire tout le flux en mémoire pour éviter les problèmes
        byte[] imageBytes = IOUtils.toByteArray(imageStream);
        try (InputStream byteStream = new ByteArrayInputStream(imageBytes)) {
            run.addPicture(byteStream,
                    pictureType,
                    "logo.png",
                    Units.toEMU(width),
                    Units.toEMU(height));
        }
    }

    private void addHeaderText(XWPFTableCell cell) {
        XWPFParagraph paragraph = cell.addParagraph();
        paragraph.setAlignment(ParagraphAlignment.LEFT);

        XWPFRun run = paragraph.createRun();
        run.setText("Republicque Tunisienne");
        run.addBreak();
        run.setText("Ministère de l'Enseignement Supérieur et de la");
        run.addBreak();
        run.setText("Recherche Scientifique");
        run.addBreak();
        run.addBreak();
        run.setText("Université de Carthage");
        run.addBreak();
        run.setText("École Nationale d'Ingénieurs de Carthage");
        run.addBreak();
        run.addBreak();
    }
   /** private void addHeader(XWPFDocument document) {
        // Ajouter le logo et les informations de l'école

        XWPFParagraph header = document.createParagraph();
        header.setAlignment(ParagraphAlignment.LEFT);
        XWPFRun headerRun = header.createRun();
        headerRun.setText("Republicque Tunisienne");
        headerRun.addBreak();
        headerRun.setText("Ministère de l'Enseignement Supérieur et de la");
        headerRun.addBreak();
        headerRun.setText("Recherche Scientifique");
        headerRun.addBreak();
        headerRun.addBreak();
        headerRun.setText("Université de Carthage");
        headerRun.addBreak();
        headerRun.setText("École Nationale d'Ingénieurs de Carthage");
        headerRun.addBreak();
        headerRun.addBreak();
    }**/

    private void addTitle(XWPFDocument document, String titleText) {
        XWPFParagraph title = document.createParagraph();
        title.setAlignment(ParagraphAlignment.CENTER);
        XWPFRun titleRun = title.createRun();
        titleRun.setText(titleText);
        titleRun.setBold(true);
        titleRun.setFontSize(16);
        titleRun.addBreak();
        titleRun.addBreak();
    }

    private void addArticle1(XWPFDocument document, Map<String, String> formData) {
        XWPFParagraph article1 = document.createParagraph();
        article1.setAlignment(ParagraphAlignment.LEFT);
        XWPFRun article1Run = article1.createRun();
        article1Run.setText("Article 1 : La présente convention règle les rapports entre :");
        article1Run.addBreak();
        article1Run.setText("L'établissement d'enseignement universitaire : École Nationale d'Ingénieurs de Carthage (ENICarthage), Représenté");
        article1Run.addBreak();
        article1Run.setText("par sa Directrice : MADAME HOUDA BEN ATTIA SETHOM  Et");
        article1Run.addBreak();
        article1Run.setText("L'établissement d'accueil : .......................................................................................");
        article1Run.addBreak();
        article1Run.setText("Adresse : .........................................................................................................................");
        article1Run.addBreak();
        article1Run.setText("Représenté par : ........................ Tuteur du Stage :................................................");
        article1Run.addBreak();
        article1Run.setText("E-mail : ..................................... - Tél : ............................. - Fax : ......................");
        article1Run.addBreak();
        article1Run.addBreak();

        // Informations de l'étudiant
        article1Run.setText("Concernant l'étudiant Stagiaire");
        article1Run.addBreak();
        article1Run.setText("Prénom : " + formData.get("Prénom") + " Nom : " + formData.get("Nom"));
        article1Run.addBreak();
        article1Run.setText("Formation :   □ Ingénierie   ☑ Masière");
        article1Run.addBreak();
        article1Run.setText("Département : Génie Informatique  □ Génie Electrique    □ Génie Industriel");
        article1Run.addBreak();
        article1Run.setText("Filière : " + formData.get("Filière") + " Niveau :   □ Première année    ☑ Deuxième année");
        article1Run.addBreak();
        article1Run.setText("N° CIN : " + formData.get("N° CIN") + " N° téléphone : " + formData.get("Téléphone") + " E-mail : " + formData.get("E-mail"));
        article1Run.addBreak();
        article1Run.addBreak();
        article1Run.setText("Pour la durée :");
        article1Run.addBreak();
        article1Run.setText("Du : ...... /...... / ......   au : ...... /...... / ......");
        article1Run.addBreak();
        article1Run.addBreak();
    }

    private void addArticle(XWPFDocument document, String articleTitle, String articleContent) {
        XWPFParagraph article = document.createParagraph();
        article.setAlignment(ParagraphAlignment.LEFT);
        XWPFRun articleRun = article.createRun();
        articleRun.setText(articleTitle + " - " + articleContent);
        articleRun.addBreak();
        articleRun.addBreak();
    }

    private void addFooter(XWPFDocument document) {
        XWPFParagraph footer = document.createParagraph();
        footer.setAlignment(ParagraphAlignment.CENTER);
        XWPFRun footerRun = footer.createRun();
        footerRun.setText("A Tunis, le ..............................    A ................, le ......................    A Tunis, le......");
        footerRun.addBreak();
        footerRun.addBreak();
        footerRun.setText("Etudiant(e) Stagiaire    Etablissement d'Accueil    Directrice de l'ENICarthage");
        footerRun.addBreak();
        footerRun.setText("(Signature)    (signature et cachet)    (signature et cachet)");
        footerRun.addBreak();
        footerRun.addBreak();

        // Coordonnées de l'école
        XWPFParagraph contact = document.createParagraph();
        contact.setAlignment(ParagraphAlignment.CENTER);
        XWPFRun contactRun = contact.createRun();
        contactRun.setText("Ecole Nationale d'Ingénieurs de Carthage, 45 rue des Entrepreneurs la CHARGUIA II, CP : 2035, TUNIS, TUNISIE");
        contactRun.addBreak();
        contactRun.setText("Téléphone : 71 940.699 / 71 940.775 Fax : 71 941.579 @ Email : entcarthage@entcarthage.mu.tn @Web : www.cnicarthage.mu.tn");
    }



}
