import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ConventionsServiceService {

 private apiUrl = 'http://localhost:8081/api';


  constructor(private http: HttpClient) { }

getConventions(): Observable<any> {
  console.log('Envoi de la requête pour récupérer les conventions');
  return this.http.get<any>(`${this.apiUrl}/conventionStagEte/getConventions`, { withCredentials: true })
    .pipe(
      tap(data => console.log('Données reçues:', data)),
      catchError(error => {
        console.error('Erreur dans getConventions:', error);
        return throwError(error);
      })
    );
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
  }}
