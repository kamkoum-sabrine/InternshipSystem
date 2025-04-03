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
import { AddConventionDialogComponent } from '../add-convention-dialog/add-convention-dialog.component';
import { ConventionsEtudiantService } from '../conventionsEtudiant-service.service';

import usersData from '../_data';
import { GererConventionsEtudiantService } from './gerer-conventionsEtudiant.service';

@Component({
  selector: 'app-conventionsEtudiant-basic-example',
  templateUrl: './conventionsEtudiant-basic-example.component.html',
  styleUrls: ['./conventionsEtudiant-basic-example.component.scss'],
  standalone: true,
  imports: [CommonModule, BadgeComponent, ButtonDirective, CollapseDirective, SmartTableComponent, TemplateIdDirective, TextColorDirective]
})
export class ConventionsEtudiantBasicExampleComponent implements OnInit {

  usersData = usersData;
  @Input() myConventions: any[] = [];;

  columns: IColumn[] = [
    {
      key: 'fichierPDFNom',
      label: 'Conventions déposées'
    },

    {
      key: 'dateDepot',
      label: 'Date de dépot',
    },

    {
      key: 'valideeService',
      label: 'Validée par le service de stage'
    },
    {
      key: 'valideeDirection',
      label: 'Validée par la direction de stage'
    },
    {
      key: 'annulee',
      label: 'Annuler'
    },

    // {
    //   key: 'createdAt',
    //   label: 'Date Registered',
    //   _props: { class: 'text-truncate' }
    // },
    // { key: 'role', _style: { width: '20%' } },
    // { key: 'filiere', label: 'Filiére', _style: { width: '20%' } },

    // { key: 'niveau', label: 'Niveau', _style: { width: '20%' } },

    // { key: 'active', _style: { width: '15%' } },
    // {
    //   key: 'show',
    //   label: '',
    //   _style: { width: '5%' },
    //   filter: false,
    //   sorter: false
    // }
  ];
  details_visible = Object.create({});

  constructor(private cdr: ChangeDetectorRef, private gererConventionsEtudiantService: GererConventionsEtudiantService, public dialog: MatDialog, private conventionsEtudiantService: ConventionsEtudiantService) { }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['myConventions']) {
      console.log('Nouvelle valeur de myConventions :', this.myConventions);
      this.cdr.detectChanges(); // Force la mise à jour de la vue
    }
  }
  ngOnInit() {
    console.log('Valeur reçue du parent:', this.myConventions);

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddConventionDialogComponent, {
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
  downloadPDF(nomFichier: string) {
    // console.log("nomFichier", nomFichier)
    // // const fileUrl = `http://localhost:8081/api/conventionStagEte/uploads/${nomFichier}`;
    const fileUrl = `http://localhost:8081/api/conventionStagEte/uploads/${nomFichier}`;

    // const link = document.createElement("a");
    // link.href = fileUrl;
    // link.download = nomFichier;
    // link.target = "_blank";
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    fetch(fileUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`, // Récupère le token si JWT est utilisé
      },
    })
      .then(response => {
        if (!response.ok) throw new Error("Accès refusé !");
        return response.blob();
      })
      .then(blob => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = nomFichier;
        link.click();
      })
      .catch(error => console.error("Erreur lors du téléchargement :", error));
  }

  getItem(item: any) {
    console.log("item " + item)
  }
  getBadge(status: number) {
    switch (status) {
      case 1:
        return 'success';
      case -1:
        return 'danger';
      case 0:
        return 'warning';
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
  getDate(dateDepot: any) {
    const formattedDate = dateDepot.split("T")[0] + " " + dateDepot.split("T")[1].split(".")[0];
    return formattedDate;
  }
  annulerDemande(id: any) {
    console.log("Id de la convention à annuler ", id);
  }
  // changerEtatCompte(itemId: number, active: boolean) {


  //   if (active == true) {
  //     Swal.fire({
  //       title: 'Êtes-vous sûr ?',
  //       text: 'Voulez vous désactiver ce comple',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonText: 'Oui, désactiver!',
  //       cancelButtonText: 'Annuler',
  //       reverseButtons: true
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         // L'événement est confirmé
  //         this.gererConventionsEtudiantService.desactiverCompte(itemId).subscribe(data => {
  //           this.gererConventionsEtudiantService.getUtilisateurs().subscribe(data => {
  //             this.users = data
  //           });
  //           console.log(data);

  //         });
  //         Swal.fire('Compte désactivé !', '', 'success');
  //         // Ajouter la logique de confirmation ici
  //       } else if (result.isDismissed) {
  //         // L'événement est annulé
  //         Swal.fire('Événement annulé', '', 'info');
  //       }
  //     });

  //   }
  //   else {

  //     Swal.fire({
  //       title: 'Êtes-vous sûr ?',
  //       text: 'Voulez vous activer ce comple',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonText: 'Oui, activer!',
  //       cancelButtonText: 'Annuler',
  //       reverseButtons: true
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         // L'événement est confirmé
  //         this.gererUtilisateurService.activerCompte(itemId).subscribe(data => {
  //           console.log(data);
  //           this.utilisateursService.getUtilisateurs().subscribe(data => {
  //             this.users = data
  //           });

  //         });
  //         Swal.fire('Compte activé !', '', 'success');
  //         // Ajouter la logique de confirmation ici
  //       } else if (result.isDismissed) {
  //         // L'événement est annulé
  //         Swal.fire('Événement annulé', '', 'info');
  //       }
  //     });

  //   }


  // }

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
