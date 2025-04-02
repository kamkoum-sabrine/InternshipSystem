import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) { }


  login(email: string, password: string) {
    return this.http.post<{ token: string; user: any }>(`${this.apiUrl}/login`, { email, password });
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Vérifie si le token existe
  }
}
