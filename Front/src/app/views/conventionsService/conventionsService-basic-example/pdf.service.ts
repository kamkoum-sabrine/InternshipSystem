import { Injectable } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';

// Solution pour Vite : Importer le worker correctement
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

@Injectable({
    providedIn: 'root'
})
export class PdfService {
    constructor() {
        // Définir l'URL du worker pour éviter l'erreur
        (pdfjsLib as any).GlobalWorkerOptions.workerSrc = workerUrl;
    }

    async extractImagesFromPdf(file: File): Promise<HTMLCanvasElement[]> {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onload = async () => {
                const typedarray = new Uint8Array(reader.result as ArrayBuffer);
                const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
                const images: HTMLCanvasElement[] = [];

                for (let i = 0; i < pdf.numPages; i++) {
                    const page = await pdf.getPage(i + 1);
                    const viewport = page.getViewport({ scale: 2 });
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');

                    if (context) {
                        canvas.width = viewport.width;
                        canvas.height = viewport.height;
                        const renderContext = { canvasContext: context, viewport };
                        await page.render(renderContext).promise;
                        images.push(canvas);
                    }
                }
                resolve(images);
            };
            reader.onerror = (error) => reject(error);
            reader.readAsArrayBuffer(file);
        });
    }
}
