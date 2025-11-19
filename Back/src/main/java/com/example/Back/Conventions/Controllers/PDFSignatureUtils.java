package com.example.Back.Conventions.Controllers;

import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Image;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfStamper;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class PDFSignatureUtils {

    public static String ajouterSignatureDirection(String cheminOriginal, String nomPDF, String signaturePath, String dossierDestination) throws IOException, DocumentException {
        String nouveauNomPDF = "SIGNE_" + nomPDF;
        String cheminFinal = dossierDestination + File.separator + nouveauNomPDF;

        PdfReader reader = new PdfReader(cheminOriginal);
        PdfStamper stamper = new PdfStamper(reader, new FileOutputStream(cheminFinal));

        Image signature = Image.getInstance(signaturePath);
        signature.scaleAbsolute(100, 50); // Taille de l'image (ajustable)

        signature.setAbsolutePosition(370, 20);

        // Ajout à la première page
        stamper.getOverContent(1).addImage(signature);
        stamper.close();
        reader.close();
// Ajout de la date de signature
        BaseFont bf = BaseFont.createFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
        PdfContentByte canvas = stamper.getOverContent(1);
        canvas.beginText();
        canvas.setFontAndSize(bf, 10);

        String dateSignature = new SimpleDateFormat("dd/MM/yyyy").format(new Date());

        canvas.showTextAligned(PdfContentByte.ALIGN_LEFT, "Le " + dateSignature, 85, 175, 0);
        canvas.endText();
        // ... signature image
        canvas.beginText();
        canvas.setFontAndSize(bf, 10);
        canvas.showTextAligned(PdfContentByte.ALIGN_LEFT, "Le " + dateSignature, 85, 175, 0);
        canvas.endText();

        return cheminFinal;
    }

    public static String ajouterSignatureDirectionPFE(String cheminOriginal, String nomPDF, String signaturePath, String dossierDestination) throws IOException, DocumentException {
        // Vérifier les chemins
        System.out.println("📂 Working directory: " + new File(".").getAbsolutePath());
        System.out.println("🔍 Chemin original: " + cheminOriginal);
        System.out.println("🖋️ Signature path: " + signaturePath);
        System.out.println("📁 Dossier de destination: " + dossierDestination);

        // Nom final du PDF signé
        String nouveauNomPDF = "SIGNE_" + nomPDF;
        String cheminFinal = dossierDestination + File.separator + nouveauNomPDF;

        File originalFile = new File(cheminOriginal);
        if (!originalFile.exists()) {
            throw new FileNotFoundException("📛 Le fichier source n'existe pas : " + cheminOriginal);
        }

        PdfReader reader = new PdfReader(cheminOriginal);
        int nbPages = reader.getNumberOfPages();
        int pageCible = Math.min(nbPages, 4); // Page 4 ou dernière page si <4

        // Création du PDF avec ajout de contenu
        FileOutputStream output = new FileOutputStream(cheminFinal);
        PdfStamper stamper = new PdfStamper(reader, output);

        // Ajouter image de signature
        Image signature = Image.getInstance(signaturePath);
        signature.scaleAbsolute(100, 50);
        signature.setAbsolutePosition(370, 180); // Position bas de page
        stamper.getOverContent(pageCible).addImage(signature);

        // Ajouter la date de signature
        PdfContentByte canvas = stamper.getOverContent(pageCible);
        BaseFont bf = BaseFont.createFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
        canvas.beginText();
        canvas.setFontAndSize(bf, 10);
        String dateSignature = new SimpleDateFormat("dd/MM/yyyy").format(new Date());
        canvas.showTextAligned(PdfContentByte.ALIGN_LEFT, "Le " + dateSignature, 85, 175, 0);
        canvas.endText();

        // Fermer le stamper et reader
        stamper.close();
        reader.close();
        output.close();

        // Vérification
        File fichierSigne = new File(cheminFinal);
        if (!fichierSigne.exists()) {
            throw new IOException("❌ Le fichier signé n'a pas été créé !");
        }

        System.out.println("✅ Signature ajoutée avec succès !");
        System.out.println("📄 Nouveau fichier : " + cheminFinal);

        return cheminFinal;
    }



}
