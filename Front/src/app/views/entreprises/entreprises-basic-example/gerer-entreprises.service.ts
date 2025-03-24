import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GererEntreprisesService {

  private apiUrl = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient) { }

  desactiverCompte(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/desactivate`, id);
  }
}
