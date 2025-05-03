import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConventionsDirectionEnicarService {

  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) { }

  getConventions(): Observable<any[]> {
    const url = `${this.apiUrl}/conventionStage/validees-chef-departementETE`;
    return this.http.get<any[]>(url);
  }

  getConventionsPFE(): Observable<any[]> {
    const url = `${this.apiUrl}/conventionStage/validees-chef-departementPFE`;
    return this.http.get<any[]>(url);
  }


  downloadPDF(nomFichier: string): Observable<Blob> {
    const url = `${this.apiUrl}/conventionStagEte/downloadPreuve/${encodeURIComponent(nomFichier)}`;

    return this.http.get(url, {
      responseType: 'blob',
      headers: {
        'Accept': 'application/pdf',
        'Cache-Control': 'no-cache'
      }
    });
  }


  validerConvention(id: number): Observable<any> {
    const url = `${this.apiUrl}/conventionStagEte/ValiderConventionDirectionEnicar/${id}`;
    console.log('[Service] validerConvention - URL:', url);
    return this.http.put(url, {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  validerConventionPFE(id: number): Observable<any> {
    const url = `${this.apiUrl}/conventionStagPFE/ValiderConventionDirectionEnicar/${id}`;
    console.log('[Service] validerConvention - URL:', url);
    return this.http.put(url, {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  generateLettreAffectation(id: number): Observable<any> {
    const url = `${this.apiUrl}/conventions/lettre-affectation/generate/${id}`;
    console.log('[Service] generer lettre d\'affectation - URL:', url);
    return this.http.post(url, {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  generateLettreAffectationPFE(id: number): Observable<any> {
    const url = `${this.apiUrl}/conventions/lettre-affectation/generatePFE/${id}`;
    console.log('[Service] generer lettre d\'affectation PFE - URL:', url);
    return this.http.post(url, {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  refuserConvention(id: number): Observable<any> {
    const url = `${this.apiUrl}/conventionStagEte/RefuserConventionDirectionEnicar/${id}`;
    return this.http.put(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  refuserConventionPFE(id: number): Observable<any> {
    const url = `${this.apiUrl}/conventionStagPFE/RefuserConventionDirectionEnicar/${id}`;
    return this.http.put(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }



}
