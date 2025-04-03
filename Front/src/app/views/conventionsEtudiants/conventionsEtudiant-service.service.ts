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


}
