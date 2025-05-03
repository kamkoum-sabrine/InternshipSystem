import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

export interface ConventionStats {
  totalConventions: number;
  conventionsSignees: number;
  conventionsEnAttente: number;
  conventionsRefusees: number;

  stageEteCount: number;
  stagePFECount: number;
  stageOuvrierCount: number;

  tauxValidationService: number;
  tauxValidationDirection: number;
  tauxValidationChefDepartement: number;
  tauxValidationComite: number;

  dureeMoyenneEte: number;
  dureeMoyennePFE: number;
}


@Injectable({
  providedIn: 'root'
})
export class StatistiquesService {
  private baseUrl = 'http://localhost:8081/api/statistiques';
  private apiUrl = 'http://localhost:8081/api/conventions/stats';

  constructor(private http: HttpClient) { }

  getAllStats(): Observable<any> {
    return forkJoin({
      usersByRole: this.http.get<{ [key: string]: number }>(`${this.baseUrl}/roles`),
      studentsByFiliereNiveau: this.http.get<any[]>(`${this.baseUrl}/etudiants`),
      activationStats: this.http.get<{ [key: string]: number }>(`${this.baseUrl}/activation`)
    });
  }

  getStats(): Observable<ConventionStats> {
    return this.http.get<ConventionStats>(this.apiUrl);
  }
  getStudentDistribution(): Observable<any> {
    return this.http.get(`${this.baseUrl}/students-distribution`);
  }
}
