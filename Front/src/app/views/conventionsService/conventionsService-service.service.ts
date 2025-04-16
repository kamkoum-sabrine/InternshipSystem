import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConventionsServiceService {

  private apiUrl = 'http://localhost:8081/api/conventionStagEte';

  constructor(private http: HttpClient) { }

  getConventions(): Observable<any[]> {
    const url = `${this.apiUrl}/getConventions`;
    return this.http.get<any[]>(url);
  }

  downloadPDF(nomFichier: string): Observable<Blob> {
    const url = `${this.apiUrl}/downloadPreuve/${encodeURIComponent(nomFichier)}`;

    return this.http.get(url, {
      responseType: 'blob',
      headers: {
        'Accept': 'application/pdf',
        'Cache-Control': 'no-cache'
      }
    });
  }


  validerConvention(id: number): Observable<any> {
    const url = `${this.apiUrl}/ValiderConvention/${id}`;
    console.log('[Service] validerConvention - URL:', url);
    return this.http.put(url, {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  refuserConvention(id: number): Observable<any> {
    const url = `${this.apiUrl}/RefuserConvention/${id}`;
    return this.http.put(url, {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

}
