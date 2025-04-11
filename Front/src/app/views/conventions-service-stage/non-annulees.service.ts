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
}