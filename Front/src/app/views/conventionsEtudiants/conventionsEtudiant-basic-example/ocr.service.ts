import { Injectable } from '@angular/core';
import Tesseract, { PSM } from 'tesseract.js';
import { createWorker } from 'tesseract.js';

@Injectable({
  providedIn: 'root'
})
export class OcrService {
  constructor() { }

  extractText(image: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const result = await Tesseract.recognize(reader.result as string, 'eng', {
          logger: (m) => console.log(m) // Pour voir la progression
        });
        resolve(result.data.text);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(image);
    });
  }

  // async extractText(file: File): Promise<string> {
  //   const worker = await createWorker('eng');

  //   // Définir les paramètres OCR pour améliorer la détection manuscrite

  //   // Définir les paramètres OCR pour améliorer la reconnaissance
  //   await worker.setParameters({
  //     tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@. ",
  //     // tessedit_pageseg_mode: "6" // Optimisé pour texte aligné (6 = Sparse Text)
  //   });

  //   const { data } = await worker.recognize(file);
  //   await worker.terminate(); // Libérer la mémoire après traitement

  //   return data.text;
  // }
}
