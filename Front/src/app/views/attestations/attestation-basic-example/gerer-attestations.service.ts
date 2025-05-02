import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GererAttestationsService {

  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) { }

  deposerConventionEtudiant(convention: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/conventionStagEte/create`, convention);
  }
  deposerConventionEtudiantPFE(conventionPFE: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/conventionStagPFE/create`, conventionPFE);
  }
  downloadPdf(studentId: number) {
    this.http.get(`http://localhost:8081/api/pdf/convention/${studentId}`, { responseType: 'blob' }).subscribe((response: Blob) => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'convention_stage.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
  downloadWord(studentId: number) {
    this.http.get(`http://localhost:8081/api/pdf/convention/word/${studentId}`, { responseType: 'blob' }).subscribe((response: Blob) => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'convention_stage_ete.docx'; // Nom du fichier Word
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  downloadWordPFE(studentId: number) {
    this.http.get(`http://localhost:8081/api/pdf/PFE/convention/word/${studentId}`, { responseType: 'blob' }).subscribe((response: Blob) => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'convention_stage_pfe.docx'; // Nom du fichier Word
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

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
