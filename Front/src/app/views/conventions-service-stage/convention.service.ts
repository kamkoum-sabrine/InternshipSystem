// convention.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// convention.service.ts
// convention.service.ts
// convention.service.ts
@Injectable({
  providedIn: 'root'
})
export class ConventionService {
  private apiUrl = 'http://localhost:8081/api/conventionStagEte';

  constructor(private http: HttpClient) {}

  getConventions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getConventions`);
  }

  downloadPDF(nomFichier: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/uploads/${nomFichier}`, {
      responseType: 'blob'
    });
  }

  validerConvention(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/ValiderConvention/${id}`, {});
  }

  refuserConvention(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/RefuserConvention/${id}`, {});
  }
}