import { Component } from '@angular/core';
import { ChangeDetectorRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BadgeComponent,
  ButtonDirective,
  CollapseDirective,
  IColumn,
  SmartTableComponent,
  TemplateIdDirective,
  TextColorDirective
} from '@coreui/angular-pro';
import Swal from 'sweetalert2';

import { GererEnseignatService } from './gerer-enseignant-service.service';
import { UpdateEnseignantDialogComponent } from '../update-enseignant-dialog/update-enseignant-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EnseignantService } from '../enseignant-service.service';

@Component({
  selector: 'app-enseignant-basic-example',
  standalone: true,
  imports: [CommonModule, BadgeComponent, ButtonDirective, CollapseDirective, SmartTableComponent, TemplateIdDirective, TextColorDirective],
  templateUrl: './enseignant-basic-example.component.html',
  styleUrl: './enseignant-basic-example.component.scss'
})
export class EnseignantBasicExampleComponent implements OnInit {

  @Input() Enseignants: any[] = [];

  columns: IColumn[] = [
    {
      key: 'nom',
      label: 'Nom',
      _style: { width: '25%' },
      filter: true
    },
    {
      key: 'prenom',
      label: 'Prénom',
      _style: { width: '25%' },
      filter: true
    },
    {
      key: 'email',
      label: 'Email',
      _style: { width: '25%' },
      filter: true
    },

    {
      key: 'actions',
      label: 'Actions',
      _style: { width: '15%' },
      filter: false,
      sorter: false
    }
  ];

  constructor(private gererEnseignatService: GererEnseignatService, private dialog: MatDialog, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    console.log('Valeur reçue du parent:', this.Enseignants);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['soutenances']) {
      console.log('Nouvelle valeur de Enseignants :', this.Enseignants);
      this.cdr.detectChanges(); // Force la mise à jour de la vue
    }
  }

  getItem(item: any) {
    console.log("item " + item)
  }

  supprimerEnseignant(itemId: number) {


    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Voulez vous supprimer cet enseignant',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // L'événement est confirmé
        this.gererEnseignatService.supprimerEnseignant(itemId).subscribe(data => {
          console.log(data);
        });
        Swal.fire('Enseignant suprimeé !', '', 'success');
        //window.location.reload();

        // Ajouter la logique de confirmation ici
      } else if (result.isDismissed) {
        // L'événement est annulé
        Swal.fire('Événement annulé', '', 'info');
      }
    });
  }

  openDialogUpdate(id: number): void {
    const dialogRef = this.dialog.open(UpdateEnseignantDialogComponent, {
      width: '600px',
      minWidth: '600px',  // Largeur minimale de 400px
      maxWidth: '600px',
      data: { EnseignantId: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Nouvau enseignant:', result);
        // Logic to add the user
      }
    });

  }


}
