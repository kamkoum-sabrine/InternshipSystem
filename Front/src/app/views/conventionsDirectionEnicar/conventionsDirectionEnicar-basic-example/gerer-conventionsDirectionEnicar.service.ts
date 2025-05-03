import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GererConventionsDirectionEnicarService {

  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) { }


  downloadPdf(studentId: number) {
    this.http.get(`http://localhost:8081/api/pdf/convention/${studentId}`, { responseType: 'blob' }).subscribe((response: Blob) => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'convention_stage.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  downloadLettreAffectation(conventionId: number) {
    this.http.get(`http://localhost:8081//api/conventions/lettre-affectation/downloadLettreAffectation/${conventionId}`, { responseType: 'blob' }).subscribe((response: Blob) => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'lettreAffectation.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
  downloadWord(studentId: number) {
    this.http.get(`http://localhost:8081/api/pdf/convention/word/${studentId}`, { responseType: 'blob' }).subscribe((response: Blob) => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'convention_stage.docx'; // Nom du fichier Word
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

}
