import { Component, OnInit } from '@angular/core';
import { NonAnnuleesService } from '../non-annulees.service';
import { SmartTableComponent } from '@coreui/angular-pro';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http'; // N'oublie pas si ce n'était pas déjà importé

@Component({
  selector: 'app-non-annulees-table',
  standalone: true,
  imports: [CommonModule, SmartTableComponent],
  templateUrl: './non-annulees-table.component.html'
})
export class NonAnnuleesTableComponent implements OnInit {
  conventions: any[] = [];
  isLoading = true;
  columns = [
    { 
      key: 'etudiantFullName', 
      label: 'Étudiant',
      _style: { width: '50%' }
    },
    { 
      key: 'preuveNom', 
      label: 'Preuve d\'annulation',
      _style: { width: '50%' }
    }
  ];

  downloadProof(fileName: string, event: Event): void {
    event.preventDefault();
    const url = `http://localhost:8081/api/conventionStagEte/uploads/${fileName}`;
    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (blob: Blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(objectUrl);
      },
      error: (err) => {
        console.error('Erreur lors du téléchargement :', err);
      }
    });
  }

  constructor(private service: NonAnnuleesService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadConventions();
  }

  loadConventions(): void {
    this.service.getConventionsNonAnnulees().subscribe({
      next: (data) => {
        console.log('Données reçues:', JSON.parse(JSON.stringify(data)));
        this.conventions = this.transformData(data);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.isLoading = false;
      }
    });
  }

  private transformData(data: any[]): any[] {
    return data.map(item => ({
      ...item,
      etudiantFullName: `${item.etudiant?.nom} ${item.etudiant?.prenom}`,
      preuveNom: item.preuveAnnulationNom
    }));
  }
}
