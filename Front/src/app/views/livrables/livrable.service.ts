import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Livrable } from './livrable.model';

@Injectable({
  providedIn: 'root'
})

export class LivrableService {
  private apiUrl = 'http://localhost:8081/api/livrable';

  constructor(private http: HttpClient) { }

  createLivrable(formData: FormData): Observable<Livrable> {
    return this.http.post<Livrable>(this.apiUrl, formData);
  }

  updateLivrable(id: number, formData: FormData): Observable<Livrable> {
    return this.http.put<Livrable>(`${this.apiUrl}/${id}`, formData);
  }

  getLivrablesByEtudiant(etudiantId: number): Observable<Livrable[]> {
    return this.http.get<Livrable[]>(`${this.apiUrl}/etudiant/${etudiantId}`);
  }

  getLivrables(): Observable<Livrable[]> {
    return this.http.get<Livrable[]>(`${this.apiUrl}`);
  }

  deleteLivrable(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getLivrableFileUrl(fileName: string): string {
    return `${this.apiUrl}/uploads/livrable/${fileName}`;
  }
}
