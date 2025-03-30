import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {

  private apiUrl = 'http://localhost:8081/api/enseignant';

  constructor(private http: HttpClient) { }

  getEnseignants(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
  supprimerEnseignant(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }


}
