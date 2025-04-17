import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TuteurPFEServiceService {

  private apiUrl = 'http://localhost:8081/api/tuteurPFE';

  constructor(private http: HttpClient) { }

  // getEntreprises(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl);
  // }

  // deleteEntreprise(id: number): Observable<any> {
  //   return this.http.delete<any>(`${this.apiUrl}/${id}`);
  // }

  addTuteur(tuteur: any, idEntreprise: any): Observable<any> {
    let tuteurPFE = {
      nom: '',
      prenom: '',
      sitePerso: '',
      grade: '',
      fonction: '',
      email: '',
      entreprise: '',
      telephone: '',
      fax: ''
    }
    tuteurPFE = tuteur
    tuteurPFE.entreprise = idEntreprise
    console.log("aded tuteur ", tuteur)
    return this.http.post<any>(this.apiUrl, tuteur);
  }
  checkExistenceTuteur(tuteur: any): Observable<any> {
    console.log("taay ", tuteur)
    return this.http.post<any>(`${this.apiUrl}/check-existence`,
      tuteur, // Assurez-vous que c'est bien l'objet JSON
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      });
  }


}
