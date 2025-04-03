import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GererConventionsEtudiantService {

  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) { }

  deposerConventionEtudiant(convention: any): Observable<any> {
    // const formData = new FormData();
    // formData.append('etudiantId', convention.etudiantId);
    // formData.append('etablissement', convention.etablissement);
    // formData.append('adresse', convention.adresse);
    // formData.append('representePar', convention.representePar);
    // formData.append('tuteurStage', convention.tuteurStage);
    // formData.append('email', convention.email);
    // formData.append('telephone', convention.telephone);
    // formData.append('dateDebut', convention.dateDebut);
    // formData.append('dateFin', convention.dateFin);
    // const fichierPDF = convention.fichierPDF; // Récupérer le fichier
    // if (fichierPDF instanceof Blob) {
    //   formData.append('fichierPDF', fichierPDF, fichierPDF.name); // Ajouter le fichier correctement
    // } else {
    //   console.error('Le fichier n\'est pas valide', fichierPDF);
    // }
    // formData.append('fichierPDF', convention.fichierPDF, convention.fichierPDF.name);
    return this.http.post<any>(`${this.apiUrl}/conventionStagEte/create`, convention);
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
