import { CommonModule } from '@angular/common';
import {
  Component, Input, OnInit
} from '@angular/core';
import {
  BadgeComponent,
  ButtonDirective,
  CollapseDirective,
  IColumn,
  SmartTableComponent,
  TemplateIdDirective,
  TextColorDirective,
  SmartTableModule
} from '@coreui/angular-pro';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
//import { UpdateLivrableDialogComponent } from '../update-livrable-dialog/update-livrable-dialog.component';
import { LivrableAddDialogComponent } from '../livrable-add-dialog/livrable-add-dialog.component';
import { LivrableService } from '../livrable.service';

@Component({
  selector: 'app-livrables-basic-example',
  templateUrl: './livrable-basic-example.component.html',
  styleUrls: ['./livrable-basic-example.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    BadgeComponent,
    ButtonDirective,
    CollapseDirective,
    SmartTableComponent,
    TemplateIdDirective,
    TextColorDirective,
    LivrableAddDialogComponent,
    SmartTableModule,
  ]
})
export class LivrablesBasicExampleComponent implements OnInit {
  @Input() livrables: any[] = [];
  isEtudiant = false;
  currentUser: any;
  deadlineLivrable!: string;

  columns: IColumn[] = [
    {
      key: 'titre',
      label: 'Titre',
      _style: { width: '20%' },
      filter: true
    },
    {
      key: 'type',
      label: 'Type',
      _style: { width: '15%' },
      filter: true
    },
    {
      key: 'dateDepot',
      label: 'Date Depot',
      _style: { width: '15%' },
      filter: true
    },
    {
      key: 'fichier',
      label: 'Fichier',
      _style: { width: '20%' },
      filter: false
    },
    {
      key: 'etat',
      label: 'Statut',
      _style: { width: '15%' },
      filter: true
    },
    {
      key: 'action',
      label: 'Actions',
      _style: { width: '15%' },
      filter: false,
      sorter: false
    }



  ];

  constructor(private dialog: MatDialog, private livrablesService: LivrableService) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.isEtudiant = user.role?.nom === 'ETUDIANT';
    this.currentUser = user;
    if (this.isEtudiant) {
      this.livrables = this.livrables.filter(l => l.etudiant.id === user.id);

    }

    this.livrablesService.getDeadline().subscribe({
      next: (res) => {
        this.deadlineLivrable = res.deadlineLivrable;
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la deadline', err);
      }
    });
  }

  getEtatColor(etat: string) {
    switch (etat.trim().toUpperCase()) {
      case 'VALIDÉ':      // Validation réussie (couleur verte)
        return 'success';
      case 'REFUSÉ':      // Refusé (couleur rouge)
        return 'danger';
      case 'RETARD':      // Retard (couleur jaune)
        return 'warning';
      case 'DÉPOSÉ':      // Déposé (couleur bleue)
        return 'primary';
      default:
        return 'secondary'; // Gris pour les états inconnus ou non spécifiés
    }
  }


  deleteLivrable(id: number) {
    Swal.fire({
      title: 'Confirmation',
      text: 'Êtes-vous sûr de vouloir supprimer ce livrable ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.livrablesService.deleteLivrable(id).subscribe({
          next: () => {
            Swal.fire('Supprimé!', 'Le livrable a été supprimé.', 'success');
            this.livrables = this.livrables.filter(l => l.id !== id);
          },
          error: (err) => {
            console.error(err);
            Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression.', 'error');
          }
        });
      }
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(LivrableAddDialogComponent, {
      width: '600px',
      minWidth: '600px',
      maxWidth: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Nouveau livrable:', result);
        // Logic to add the user
      }
    });
  }

  validerLivrable(id: number) {
    this.livrablesService.validerLivrable(id).subscribe({
      next: (updated) => {
        Swal.fire('Validé!', 'Le livrable a été validé.', 'success');
        const index = this.livrables.findIndex(l => l.id === id);
        if (index !== -1) {
          this.livrables[index].etat = 'VALIDÉ';  // Mettre à jour l'état localement
        }
        // Rafraîchir la page après la validation
        window.location.reload();
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Erreur', 'Erreur lors de la validation.', 'error');
      }
    });
  }

  refuserLivrable(id: number) {
    this.livrablesService.refuserLivrable(id).subscribe({
      next: (updated) => {
        Swal.fire('Refusé!', 'Le livrable a été refusé.', 'info');
        const index = this.livrables.findIndex(l => l.id === id);
        if (index !== -1) {
          this.livrables[index].etat = 'REJETE';  // Mettre à jour l'état localement
        }
        // Rafraîchir la page après le refus
        window.location.reload();
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Erreur', 'Erreur lors du refus.', 'error');
      }
    });
  }

}