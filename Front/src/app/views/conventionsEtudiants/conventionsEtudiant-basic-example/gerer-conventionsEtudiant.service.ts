import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GererConventionsEtudiantService {

  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) { }

  // desactiverCompte(id: number): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/users/desactivate`, id);
  // }
  // activerCompte(id: number): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/users/activate`, id);
  // }

  // getAllRoles(): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/roles/all`);
  // }

  // creerUtilisateur(utilisateur: any): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/users/register`, utilisateur);
  // }

  // getUserById(id: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/users/userId/${id}`);
  // }
}
