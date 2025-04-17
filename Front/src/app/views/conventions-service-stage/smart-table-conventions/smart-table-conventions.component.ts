import { Component, Input } from '@angular/core';
import { ConventionService } from '../convention.service';
import {
  BadgeComponent,
  ButtonDirective,
  SmartTableComponent
} from '@coreui/angular-pro';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-smart-table-convention',
  standalone: true,
  imports: [SmartTableComponent, BadgeComponent, ButtonDirective],
  templateUrl: './smart-table-conventions.component.html'
})
export class SmartTableConventionsComponent {
  @Input() set conventions(value: any[]) {
    console.log('[Component] Input conventions:', value);
    this._conventions = value;
  }
  get conventions(): any[] {
    return this._conventions;
  }
  private _conventions: any[] = [];
  ngAfterViewInit() {
    console.log('Columns config:', this.columns);
    console.log('Données reçues:', this.conventions);
  }
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

  constructor(private conventionService: ConventionService) {
    console.log('[Component] Initialisation');
  }

  downloadConvention(nomFichier: string): void {
    console.group('[Component] Téléchargement PDF');
    console.log('Nom fichier reçu:', nomFichier);

    if (!nomFichier) {
      console.warn('Aucun nom de fichier fourni');
      Swal.fire('Erreur', 'Aucun fichier disponible', 'error');
      console.groupEnd();
      return;
    }

    console.log('Appel du service downloadPDF...');
    this.conventionService.downloadPDF(nomFichier).subscribe({
      next: (blob) => {
        console.log('Réponse du service - Type Blob:', blob.type, 'Size:', blob.size);
        const link = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        console.log('URL Object créée:', objectUrl);

        link.href = objectUrl;
        link.download = nomFichier;
        console.log('Configuration du lien:', {
          href: link.href,
          download: link.download
        });

        document.body.appendChild(link);
        console.log('Déclenchement du click...');
        link.click();
        document.body.removeChild(link);

        setTimeout(() => {
          URL.revokeObjectURL(objectUrl);
          console.log('Nettoyage URL Object');
        }, 100);

        console.groupEnd();
      },
      error: (err) => {
        console.error('Erreur du service:', err);
        Swal.fire('Erreur', 'Impossible de télécharger le fichier', 'error');
        console.groupEnd();
      }
    });
  }

  validerConvention(id: number): void {
    console.group('[Component] Validation convention');
    console.log('ID convention à valider:', id);

    Swal.fire({
      title: 'Confirmer la validation',
      text: 'Voulez-vous vraiment valider cette convention ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Valider',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Utilisateur a confirmé la validation');
        this.conventionService.validerConvention(id).subscribe({
          next: () => {
            console.log('Validation réussie côté serveur');
            Swal.fire('Succès', 'Convention validée', 'success');
            this.updateConventionStatus(id, 1);
            console.groupEnd();
          },
          error: (err) => {
            console.error('Erreur de validation:', err);
            Swal.fire('Erreur', 'Validation échouée', 'error');
            console.groupEnd();
          }
        });
      } else {
        console.log('Validation annulée par l\'utilisateur');
        console.groupEnd();
      }
    });
  }

  refuserConvention(id: number): void {
    console.group('[Component] Refus convention');
    console.log('ID convention à refuser:', id);

    Swal.fire({
      title: 'Confirmer le refus',
      text: 'Voulez-vous vraiment refuser cette convention ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Refuser',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Utilisateur a confirmé le refus');
        this.conventionService.refuserConvention(id).subscribe({
          next: () => {
            console.log('Refus réussi côté serveur');
            Swal.fire('Succès', 'Convention refusée', 'success');
            this.updateConventionStatus(id, -1);
            console.groupEnd();
          },
          error: (err) => {
            console.error('Erreur de refus:', err);
            Swal.fire('Erreur', 'Refus échoué', 'error');
            console.groupEnd();
          }
        });
      } else {
        console.log('Refus annulé par l\'utilisateur');
        console.groupEnd();
      }
    });
  }

  private updateConventionStatus(id: number, status: number): void {
    console.log('Mise à jour statut convention ID:', id, 'Nouveau statut:', status);
    const convention = this.conventions.find(c => c.id === id);
    if (convention) {
      console.log('Convention trouvée:', convention);
      convention.valideeService = status;
    } else {
      console.warn('Aucune convention trouvée avec ID:', id);
    }
  }

  getDate(dateString: string): string {
    if (!dateString) {
      console.log('Date vide reçue');
      return '';
    }
    const date = new Date(dateString);
    console.log('Conversion date:', dateString, '→', date);
    return date.toLocaleDateString('fr-FR');
  }
}