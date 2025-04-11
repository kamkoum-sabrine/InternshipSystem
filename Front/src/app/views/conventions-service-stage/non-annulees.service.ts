import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NonAnnuleesService {
  private apiUrl = 'http://localhost:8081/api/conventionStagEte';

  constructor(private http: HttpClient) {
    console.log('Service initialisé avec URL:', this.apiUrl);
  }
  downloadPDF(fileName: string): void {
    const url = `http://localhost:8081/api/conventionStagEte/downloadPreuve/${encodeURIComponent(fileName)}`;
    
    this.http.get(url, { responseType: 'blob' }).subscribe((response: Blob) => {
      const blobUrl = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(blobUrl);
    }, error => {
      console.error('Erreur lors du téléchargement du fichier :', error);
    });
  }
  
  getConventionsNonAnnulees(): Observable<any[]> {
    console.log('Requête envoyée vers:', `${this.apiUrl}/ConventionsAvecPreuveNonAnnulees`);
    return this.http.get<any[]>(`${this.apiUrl}/ConventionsAvecPreuveNonAnnulees`).pipe(
      tap({
        next: data => console.log('Données reçues:', data),
        error: err => console.error('Erreur de requête:', err)
      })
    );
  }
}