import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
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

import soutenancesData from '../_data';
import { GererSoutenancesService } from './gerer-soutenances.service';
import { UpdateSoutenanceDialogComponent } from '../update-soutenance-dialog/update-soutenance-dialog.component';
import { AfficherJuryDialogComponent } from '../afficher-jury-dialog/afficher-jury-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-soutenances-basic-example',
  templateUrl: './soutenances-basic-example.component.html',
  styleUrls: ['./soutenances-basic-example.component.scss'],
  standalone: true,
  imports: [CommonModule, BadgeComponent, ButtonDirective, CollapseDirective, SmartTableComponent, TemplateIdDirective, TextColorDirective]
})
export class SoutenancesBasicExampleComponent implements OnInit {

  soutenancesData = soutenancesData;
  @Input() soutenances: any[] = [];

  columns: IColumn[] = [
    {
      key: 'etudiant',
      label: 'Nom & Prénom',
      _style: { width: '15%' }
    },
    {
      key: 'date',
      label: 'Date',
      _style: { width: '15%' }
    },
    {
      key: 'salle',
      label: 'Salle',
      _style: { width: '10%' }
    },
    {
      key: 'sujet',
      label: 'sujet',
      _style: { width: '25%' }
    },
    {
      key: 'encadrant',
      label: 'Encadrant',
      _style: { width: '15%' }
    },
    {
      key: 'action',
      label: 'Action',
      _style: { width: '25%' },
      filter: false,
      sorter: false
    }
  ];
  details_visible = Object.create({});

  constructor(private cdr: ChangeDetectorRef, private GererSoutenancesService: GererSoutenancesService, public dialog: MatDialog) { }

  ngOnInit() {
    console.log('Valeur reçue du parent:', this.soutenances);

  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['soutenances']) {
      console.log('Nouvelle valeur de soutenances :', this.soutenances);
      this.cdr.detectChanges(); // Force la mise à jour de la vue
    }
  }

  getItem(item: any) {
    console.log("item " + item)
  }
  getBadge(status: boolean) {
    switch (status) {
      case true:
        return 'success';
      case false:
        return 'danger';
      default:
        return 'primary';
    }
  }



  supprimerSoutenance(itemId: number) {


    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Voulez vous supprimer cette soutenance',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // L'événement est confirmé
        this.GererSoutenancesService.supprimerSoutenance(itemId).subscribe(data => {
          console.log(data);
        });
        Swal.fire('Soutenance suprimeé !', '', 'success');
        window.location.reload();

        // Ajouter la logique de confirmation ici
      } else if (result.isDismissed) {
        // L'événement est annulé
        Swal.fire('Événement annulé', '', 'info');
      }
    });
  }

  openDialogUpdate(id: number): void {
    const dialogRef = this.dialog.open(UpdateSoutenanceDialogComponent, {
      width: '600px',
      minWidth: '600px',  // Largeur minimale de 400px
      maxWidth: '600px',
      data: { soutenanceId: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Nouvelle soutenance:', result);
        // Logic to add the user
      }
    });

  }

  AfficherJury(id: number): void {
    const dialogRef = this.dialog.open(AfficherJuryDialogComponent, {
      width: '600px',
      minWidth: '600px',  // Largeur minimale de 400px
      maxWidth: '600px',
      data: { soutenanceId: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Affichage Jury:', result);
        // Logic to add the user
      }
    });


  }






}



