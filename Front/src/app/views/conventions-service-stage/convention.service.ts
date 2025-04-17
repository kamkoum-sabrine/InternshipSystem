import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConventionService {
  private apiUrl = 'http://localhost:8081/api/conventionStagEte';

  constructor(private http: HttpClient) {
    console.log('[Service] Initialisation avec URL:', this.apiUrl);
  }

  getConventions(): Observable<any[]> {
    const url = `${this.apiUrl}/getConventions`;
    console.log('[Service] Appel getConventions - URL:', url);
    return this.http.get<any[]>(url);
  }

  downloadPDF(nomFichier: string): Observable<Blob> {
    const url = `${this.apiUrl}/downloadPreuve/${encodeURIComponent(nomFichier)}`;
    console.log('Tentative de téléchargement:', url);
  
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
    console.log('[Service] refuserConvention - URL:', url);
    return this.http.put(url, {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}