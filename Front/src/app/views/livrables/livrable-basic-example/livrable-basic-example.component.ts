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

  constructor(private dialog: MatDialog, livrablesService: LivrableService) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.isEtudiant = user.role?.nom === 'ETUDIANT';
    this.currentUser = user;

    if (this.isEtudiant) {
      this.livrables = this.livrables.filter(l => l.etudiant.id === user.id);
    }
  }

  getEtatColor(etat: string) {
    switch (etat) {
      case 'VALIDE': return 'success';
      case 'REJETE': return 'danger';
      default: return 'primary';
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
        // Appel service suppression
      }
    });
  }
  /*
  openUpdateDialog(id: number) {
    const dialogRef = this.dialog.open(UpdateLivrableDialogComponent, {
      width: '600px',
      data: { livrableId: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Mise à jour
      }
    });
  }*/



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
}