import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EntreprisesServiceService {
  private apiUrl = 'http://localhost:8085/api/entreprises';

  constructor(private http: HttpClient) {}

  getEntreprises(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  deleteEntreprise(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  addEntreprise(entreprise: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, entreprise);
  }

  updateEntreprise(id: number, entreprise: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, entreprise);
  }
}