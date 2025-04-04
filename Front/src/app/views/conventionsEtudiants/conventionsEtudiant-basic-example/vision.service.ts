// vision.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class VisionService {
  private API_KEY = 'AIzaSyDZnRAL6289Uje9D7BLVvt0huuygVhpdz4'; // À sécuriser côté backend en production !
  private API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${this.API_KEY}`;

  async extractTextFromPDF(pdfFile: File): Promise<string> {
    // Convertir le PDF en base64
    const base64PDF = await this.fileToBase64(pdfFile);

    const request = {
      requests: [{
        inputConfig: {
          mimeType: "application/pdf",
          content: base64PDF.split(',')[1] // Retire le préfixe data:application/pdf;base64,
        },
        features: [{ type: "DOCUMENT_TEXT_DETECTION" }],
        imageContext: {
          languageHints: ["fr"]
        }
      }]
    };

    try {
      const response = await axios.post(this.API_URL, request);
      return response.data.responses[0].fullTextAnnotation?.text || 'Aucun texte détecté';
    } catch (error) {
      console.error('Erreur Vision API:', error);
      return 'Erreur lors de l\'extraction';
    }
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  }
}