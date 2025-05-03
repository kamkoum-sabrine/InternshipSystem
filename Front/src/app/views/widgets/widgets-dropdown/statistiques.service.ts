import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatistiquesService {
  private baseUrl = 'http://localhost:8081/api/statistiques';

  constructor(private http: HttpClient) { }

  getAllStats(): Observable<any> {
    return forkJoin({
      usersByRole: this.http.get<{ [key: string]: number }>(`${this.baseUrl}/roles`),
      studentsByFiliereNiveau: this.http.get<any[]>(`${this.baseUrl}/etudiants`),
      activationStats: this.http.get<{ [key: string]: number }>(`${this.baseUrl}/activation`)
    });
  }

  getStudentDistribution(): Observable<any> {
    return this.http.get(`${this.baseUrl}/students-distribution`);
  }
}
