import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntreprisesServiceService {
  private apiUrl = 'http://localhost:8085/api/entreprises';

  constructor(private http: HttpClient) { }

  getEntreprises(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  deleteEntreprise(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // ✅ Ajout d'une entreprise (Méthode POST)
  addEntreprise(entreprise: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, entreprise);
  }
}