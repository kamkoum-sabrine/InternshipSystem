import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GererEnseignatService {

  private apiUrl = 'http://localhost:8081/api/enseignant';

  constructor(private http: HttpClient) { }
  supprimerEnseignant(id: number): Observable<any> {


    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}
