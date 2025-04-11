import { Component, OnInit } from '@angular/core';
import { NonAnnuleesService } from '../non-annulees.service';
import { SmartTableComponent } from '@coreui/angular-pro';
import { CommonModule } from '@angular/common';

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
      key: 'etudiant', 
      label: 'Étudiant',
      _style: { width: '50%' },
      _value: (item: any) => `${item.etudiant?.nom} ${item.etudiant?.prenom}`
    },
    { 
      key: 'preuve', 
      label: 'Preuve d\'annulation',
      _style: { width: '50%' },
      _value: (item: any) => item.preuveAnnulationNom
    }
  ];

  constructor(private service: NonAnnuleesService) {}

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
      // Transformation explicite des données si nécessaire
      etudiantFullName: `${item.etudiant?.nom} ${item.etudiant?.prenom}`
    }));
  }
}