package com.example.Back.Conventions.Services;

import com.example.Back.enums.Filiere;
import com.example.Back.enums.Formation;
import com.example.Back.enums.Niveau;
import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.*;
import com.itextpdf.kernel.pdf.canvas.PdfCanvas;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class TelechargerConventionService {

    private static final String TEMPLATE_PATH = "src/main/resources/Documents/convention_stage_template.pdf";

    public byte[] generateConventionPdf(Map<String, String> formData) throws IOException {
        try (PdfReader pdfReader = new PdfReader(TEMPLATE_PATH); ByteArrayOutputStream outputStream = new ByteArrayOutputStream(); PdfWriter pdfWriter = new PdfWriter(outputStream); PdfDocument pdfDoc = new PdfDocument(pdfReader, pdfWriter)) {

            PdfFont font = PdfFontFactory.createFont(StandardFonts.TIMES_ROMAN);
            PdfPage page = pdfDoc.getFirstPage();
            PdfCanvas canvas = new PdfCanvas(page);


            // 🖊 Ajouter les champs aux positions spécifiques




            if (formData.get("Formation").equals(String.valueOf(Formation.Ingénierie))) {
                drawText(canvas, font, "x", 93, 508);
            }//Ingénierie
            else if (formData.get("Formation").equals(String.valueOf(Formation.Mastère))) {
                drawText(canvas, font, "x", 154, 508);
            }

            drawText(canvas, font, formData.getOrDefault("Prénom", ""), 140, 521); // Prénom
            drawText(canvas, font, formData.getOrDefault("Nom", ""), 350, 521);   // Nom
            drawText(canvas, font, formData.getOrDefault("N° CIN", ""), 110, 467); // N° CIN
            drawText(canvas, font, formData.getOrDefault("E-mail", ""), 380, 467); // E-mail
            drawText(canvas, font, formData.getOrDefault("Ntéléphone", ""), 250, 467); // N° téléphone
            drawText(canvas, font, formData.getOrDefault("Filière", ""), 110, 481); // Filière
            if (formData.get("Niveau").equals(String.valueOf(Niveau.Deuxième))) {
                drawText(canvas, font, "x", 396, 481); // Filière
            } else if (formData.get("Niveau").equals(String.valueOf(Niveau.Première))) {
                drawText(canvas, font, "x", 309, 481); // Filière
            }

            if (formData.get("Filière").equals(String.valueOf(Filiere.Informatique))) {
                drawText(canvas, font, "X", 172, 493); // Filière
            } else if (formData.get("Filière").equals(String.valueOf(Filiere.Infotronique)) || formData.get("Filière").equals(String.valueOf(Filiere.Mecatronique))) {
                drawText(canvas, font, "X", 252, 493); // Filière
            } else if (formData.get("Filière").equals(String.valueOf(Filiere.GSIL))) {
                drawText(canvas, font, "X", 337, 493); // Filière
            }

            pdfDoc.close();
            return outputStream.toByteArray();
        }
    }

    // 📌 Fonction pour écrire le texte à une position donnée
    private void drawText(PdfCanvas canvas, PdfFont font, String text, float x, float y) {
        if (text == null || text.isEmpty()) return; // Évite d'écrire du texte vide

        // Ne pas ajouter de fond blanc si le texte est "X"
        if (!text.equalsIgnoreCase("X")) {
            float textWidth = font.getWidth(text, 11); // Largeur du texte
            float textHeight = 12; // Hauteur estimée du texte

            // 🎨 Dessiner un rectangle blanc derrière le texte (pas pour "X")
            canvas.saveState()
                    .setFillColorRgb(1, 1, 1) // Blanc
                    .rectangle(x - 3, y - 2, textWidth + 5, textHeight) // Ajuster le padding
                    .fill()
                    .restoreState();
        }

        // 📝 Écrire le texte normalement
        canvas.beginText()
                .setFontAndSize(font, 11)
                .moveText(x, y)
                .showText(text)
                .endText();
    }

}
