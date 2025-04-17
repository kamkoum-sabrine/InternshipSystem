import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConventionsEtudiantService {

  private apiUrl = 'http://localhost:8081/api';


  constructor(private http: HttpClient) { }

  getMesConventions(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/conventionStagEte/getMyConventions/${id}`, { withCredentials: true });
  }
  getMesConventionsPFE(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/conventionStagPFE/getMyConventions/${id}`, { withCredentials: true });
  }
  uploadPreuveAnnulation(conventionId: number, formData: FormData): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/conventionStagEte/uploadPreuveAnnulation/${conventionId}`,
      formData,
      {
        withCredentials: true,
        responseType: 'text' // Ajoutez ceci pour accepter une réponse texte
      }
    );
  }

}
