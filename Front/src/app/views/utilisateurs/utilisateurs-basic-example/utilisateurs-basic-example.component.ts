import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { UtilisateursService } from '../utilisateurs-service.service';

import usersData from '../_data';
import { GererUtilisateurService } from './gerer-utilisateur.service';

@Component({
  selector: 'app-utilisateurs-basic-example',
  templateUrl: './utilisateurs-basic-example.component.html',
  styleUrls: ['./utilisateurs-basic-example.component.scss'],
  standalone: true,
  imports: [CommonModule, BadgeComponent, ButtonDirective, CollapseDirective, SmartTableComponent, TemplateIdDirective, TextColorDirective]
})
export class UtilisateursBasicExampleComponent implements OnInit {

  usersData = usersData;
  @Input() users: any[] = [];;

  columns: IColumn[] = [

    {
      key: 'nom',
      label: 'Nom',
    },
    {
      key: 'prenom'
    },

    // {
    //   key: 'createdAt',
    //   label: 'Date Registered',
    //   _props: { class: 'text-truncate' }
    // },
    { key: 'role', _style: { width: '20%' } },
    { key: 'filiere', label: 'Filiére', _style: { width: '20%' } },

    { key: 'niveau', label: 'Niveau', _style: { width: '20%' } },

    { key: 'active', _style: { width: '15%' } },
    {
      key: 'show',
      label: '',
      _style: { width: '5%' },
      filter: false,
      sorter: false
    }
  ];
  details_visible = Object.create({});

  constructor(private cdr: ChangeDetectorRef, private gererUtilisateurService: GererUtilisateurService, public dialog: MatDialog, private utilisateursService: UtilisateursService) { }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['users']) {
      console.log('Nouvelle valeur de users :', this.users);
      this.cdr.detectChanges(); // Force la mise à jour de la vue
    }
  }
  ngOnInit() {
    console.log('Valeur reçue du parent:', this.users);

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '600px',
      minWidth: '600px',  // Largeur minimale de 400px
      maxWidth: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Nouvelle soutenance:', result);
        // Logic to add the user
      }
    });
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

  toggleDetails(itemId: number) {
    console.log("Avant :", this.details_visible[itemId]);

    // Initialiser à false si non défini, puis inverser
    this.details_visible[itemId] = !this.details_visible[itemId];

    console.log("Après :", this.details_visible[itemId]);
  }
  changerEtatCompte(itemId: number, active: boolean) {


    if (active == true) {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Voulez vous désactiver ce comple',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, désactiver!',
        cancelButtonText: 'Annuler',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          // L'événement est confirmé
          this.gererUtilisateurService.desactiverCompte(itemId).subscribe(data => {
            this.utilisateursService.getUtilisateurs().subscribe(data => {
              this.users = data
            });
            console.log(data);

          });
          Swal.fire('Compte désactivé !', '', 'success');
          // Ajouter la logique de confirmation ici
        } else if (result.isDismissed) {
          // L'événement est annulé
          Swal.fire('Événement annulé', '', 'info');
        }
      });

    }
    else {

      Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Voulez vous activer ce compte',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, activer!',
        cancelButtonText: 'Annuler',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          // L'événement est confirmé
          this.gererUtilisateurService.activerCompte(itemId).subscribe(data => {
            console.log(data);
            this.utilisateursService.getUtilisateurs().subscribe(data => {
              this.users = data
            });

          });
          Swal.fire('Compte activé !', '', 'success');
          // Ajouter la logique de confirmation ici
        } else if (result.isDismissed) {
          // L'événement est annulé
          Swal.fire('Activation annulé', '', 'info');
        }
      });

    }


  }

  openDialogUpdate(id: number): void {
    // const dialogRef = this.dialog.open(AddUserDialogComponent, {
    //   width: '600px',
    //   minWidth: '600px',  // Largeur minimale de 400px
    //   maxWidth: '600px',
    //   data: { utilisateur: id, edit: true }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     console.log('Editer utilisateur:', result);
    //     // Logic to add the user
    //   }
    // });

  }


}
