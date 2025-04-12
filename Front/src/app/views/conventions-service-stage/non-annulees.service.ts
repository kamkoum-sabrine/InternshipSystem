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
  
  
  getConventionsNonAnnulees(): Observable<any[]> {
    console.log('Requête envoyée vers:', `${this.apiUrl}/ConventionsAvecPreuveNonAnnulees`);
    return this.http.get<any[]>(`${this.apiUrl}/ConventionsAvecPreuveNonAnnulees`).pipe(
      tap({
        next: data => console.log('Données reçues:', data),
        error: err => console.error('Erreur de requête:', err)
      })
    );
  }
  annulerConvention(conventionId: number): Observable<string> {
    return this.http.put(`${this.apiUrl}/annuler/${conventionId}`, {}, { responseType: 'text' });
  }
  
  
  refuserAnnulation(conventionId: number): Observable<string> {
    return this.http.put(`${this.apiUrl}/refuserAnnulation/${conventionId}`, {}, { responseType: 'text' });
  }
  telechargerPreuveAnnulation(conventionId: number): Observable<Blob> {
    const url = `${this.apiUrl}/telechargerPreuveAnnulation/${conventionId}`;
    console.log('🌐 Téléchargement via URL:', url);
  
    return this.http.get(url, { responseType: 'blob' }).pipe(
      tap({
        next: () => console.log('📦 PDF téléchargé avec succès depuis le backend'),
        error: (err) => console.error('❌ Erreur lors de la récupération du PDF:', err)
      })
    );
  }
  
  
}