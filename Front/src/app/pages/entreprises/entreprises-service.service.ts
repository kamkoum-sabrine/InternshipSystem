import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntreprisesService {

  private apiUrl = 'http://localhost:8085/api/entreprises'; 

  constructor(private http: HttpClient) { }

  getEntreprises(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  deleteEntreprise(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
 


  
}





 


