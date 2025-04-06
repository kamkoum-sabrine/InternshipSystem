import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GererSoutenancesService {

  private apiUrl = 'http://localhost:8081/api/soutenance';

  constructor(private http: HttpClient) { }



  getEncadrants(): Observable<any> {
    return this.http.get(`http://localhost:8081/api/enseignant`);
  }

  getEtudiants(): Observable<any> {
    return this.http.get(`http://localhost:8081/api/users/etudiants`);
  }

  getSoutenanceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Méthode pour créer une soutenance
  addSoutenance(soutenance: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, soutenance);
  }

  updateSoutenance(soutenance: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${soutenance.id}`, soutenance);
  }

  supprimerSoutenance(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }






}
