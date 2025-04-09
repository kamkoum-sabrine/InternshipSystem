// convention.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConventionService {
  private apiUrl = 'http://localhost:8081/api/conventionStagEte';

  constructor(private http: HttpClient) { }

  getConventions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getConventions`);
  }
}