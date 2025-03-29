import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GererUtilisateurService {

  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) { }

  desactiverCompte(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/desactivate`, id);
  }
  activerCompte(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/activate`, id);
  }

  getAllRoles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/roles/all`);
  }

  creerUtilisateur(utilisateur: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/register`, utilisateur);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/userId/${id}`);
  }
}
