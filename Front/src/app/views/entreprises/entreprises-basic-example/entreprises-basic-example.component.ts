import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  SmartTableComponent,
  IColumn,
} from '@coreui/angular-pro';
import { EntreprisesServiceService } from '../entreprises-service.service'; // Import your service for delete functionality

@Component({
  selector: 'app-entreprises-basic-example',
  templateUrl: './entreprises-basic-example.component.html',
  styleUrls: ['./entreprises-basic-example.component.scss'],
  standalone: true,
  imports: [CommonModule, SmartTableComponent]
})
export class EntreprisesBasicExampleComponent implements OnInit {

  @Input() entreprises: any[] = [];

  columns: IColumn[] = [
    { key: 'nom', label: 'Nom de l\'entreprise' },
    { key: 'adresse', label: 'Adresse' },
    { key: 'email', label: 'Email' },
    { key: 'telephone', label: 'Téléphone' },
    { key: 'actions', label: 'Actions' } // Add actions column
  ];

  constructor(private entrepriseService: EntreprisesServiceService) { }

  ngOnInit() {
    console.log('Entreprises reçues du parent:', this.entreprises);
  }

  // Delete entreprise function
  deleteEntreprise(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette entreprise ?')) {
      this.entrepriseService.deleteEntreprise(id).subscribe(() => {
        // Remove the deleted entreprise from the list
        this.entreprises = this.entreprises.filter(entreprise => entreprise.id !== id);
        console.log('Entreprise supprimée avec succès');
      }, error => {
        console.error('Erreur lors de la suppression de l\'entreprise:', error);
      });
    }
  }

}