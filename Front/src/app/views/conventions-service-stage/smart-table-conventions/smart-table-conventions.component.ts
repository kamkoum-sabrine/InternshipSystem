// smart-table-convention.component.ts
import { Component, Input } from '@angular/core';
import { ConventionService } from '../convention.service';
import { 
  BadgeComponent,
  ButtonDirective,
  SmartTableComponent
} from '@coreui/angular-pro';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-smart-table-convention', // Nom corrigé ici
  standalone: true,
  imports: [SmartTableComponent, BadgeComponent, ButtonDirective],
  templateUrl: './smart-table-conventions.component.html' // Nom de fichier corrigé
})
export class SmartTableConventionsComponent { // Nom de classe corrigé
  @Input() conventions: any[] = [];

  columns = [
    { 
      key: 'fichierPDFNom', 
      label: 'Conventions déposées',
      _style: { width: '40%' }
    },
    { 
      key: 'dateDepot', 
      label: 'Date de dépot',
      _style: { width: '30%' }
    },
    { 
      key: 'actions', 
      label: 'Actions',
      _style: { width: '30%' },
      filter: false,
      sorter: false
    }
  ];

  constructor(private conventionService: ConventionService) {}

  downloadConvention(nomFichier: string): void {
    this.conventionService.downloadPDF(nomFichier).subscribe({
      next: (blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = nomFichier;
        link.click();
      },
      error: (err) => {
        console.error('Erreur:', err);
        Swal.fire('Erreur', 'Impossible de télécharger le fichier', 'error');
      }
    });
  }

  validerConvention(id: number): void {
    Swal.fire({
      title: 'Confirmer la validation',
      text: 'Voulez-vous vraiment valider cette convention ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Valider',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.conventionService.validerConvention(id).subscribe({
          next: () => {
            Swal.fire('Succès', 'Convention validée', 'success');
            this.updateConventionStatus(id, 1);
          },
          error: () => Swal.fire('Erreur', 'Validation échouée', 'error')
        });
      }
    });
  }

  refuserConvention(id: number): void {
    Swal.fire({
      title: 'Confirmer le refus',
      text: 'Voulez-vous vraiment refuser cette convention ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Refuser',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.conventionService.refuserConvention(id).subscribe({
          next: () => {
            Swal.fire('Succès', 'Convention refusée', 'success');
            this.updateConventionStatus(id, -1);
          },
          error: () => Swal.fire('Erreur', 'Refus échoué', 'error')
        });
      }
    });
  }

  private updateConventionStatus(id: number, status: number): void {
    const convention = this.conventions.find(c => c.id === id);
    if (convention) {
      convention.valideeService = status;
    }
  }

  getDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  }
}