import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ConventionComiteService {

 private apiUrl = 'http://localhost:8081/api';
 
   constructor(private http: HttpClient) { }
 
   getConventions(): Observable<any[]> {
     const url = `${this.apiUrl}/conventionStagEte/getConventions`;
     return this.http.get<any[]>(url);
   }
 
   getConventionsPFE(): Observable<any[]> {
     const url = `${this.apiUrl}/conventionStagPFE/getConventions`;
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
     const url = `${this.apiUrl}/conventionStagEte/ValiderConvention/${id}`;
     console.log('[Service] validerConvention - URL:', url);
     return this.http.put(url, {}, {
       headers: {
         'Content-Type': 'application/json'
       }
     });
   }
 
   validerConventionPFE(id: number): Observable<any> {
     const url = `${this.apiUrl}/conventionStagPFE/ValiderConvention/${id}`;
     console.log('[Service] validerConvention - URL:', url);
     return this.http.put(url, {}, {
       headers: {
         'Content-Type': 'application/json'
       }
     });
   }
 
   refuserConvention(id: number, convention: any): Observable<any> {
     console.log(convention)
     const url = `${this.apiUrl}/conventionStagEte/RefuserConvention/${id}`;
     return this.http.put(url, convention, {
       headers: {
         'Content-Type': 'application/json'
       }
     });
   }
 
   refuserConventionPFE(id: number, convention: any): Observable<any> {
     console.log(convention)
     const url = `${this.apiUrl}/conventionStagPFE/RefuserConvention/${id}`;
     return this.http.put(url, convention, {
       headers: {
         'Content-Type': 'application/json'
       }
     });
   }
 
}
