import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GererEnseignatService {

  private apiUrl = 'http://localhost:8081/api/enseignant';

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Récupérer le token stocké
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  constructor(private http: HttpClient) { }
  supprimerEnseignant(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  addEnseignant(enseignant: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, enseignant);
  }

  getEnseignantById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateSoutenance(enseignant: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${enseignant.id}`, enseignant);
  }
}
