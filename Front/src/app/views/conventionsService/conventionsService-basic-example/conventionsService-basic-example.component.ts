import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Ajoutez cet import
import { Router } from '@angular/router';
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
import { ConventionsServiceService } from '../conventionsService-service.service';

import usersData from '../_data';
import { GererConventionsServiceService } from './gerer-conventionsService.service';

@Component({
  selector: 'app-conventionsService-basic-example',
  templateUrl: './conventionsService-basic-example.component.html',
  styleUrls: ['./conventionsService-basic-example.component.scss'],
  standalone: true,
  imports: [CommonModule, BadgeComponent, ButtonDirective, CollapseDirective, SmartTableComponent, TemplateIdDirective, TextColorDirective]
})
export class ConventionsServiceBasicExampleComponent implements OnInit {

  usersData = usersData;
  @Input() conventions: any[] = [];;
  @ViewChild('annulationModal') annulationModal!: TemplateRef<any>; // Ajoutez cette ligne

  selectedFile: File | null = null;
  currentConventionId: number | null = null;

  columns: IColumn[] = [
    {
      key: 'etudiant',
      label: 'Etudiant'
    },

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
      label: 'Etat'
    },

    {
      key: 'actions',
      label: 'Actions'
    }
  ];
  details_visible = Object.create({});

  constructor(private cdr: ChangeDetectorRef, private router: Router, private gererConventionsServiceService: GererConventionsServiceService, public dialog: MatDialog, private modalService: NgbModal, private conventionsServiceService: ConventionsServiceService) { }



  ngOnChanges(changes: SimpleChanges) {
    if (changes['conventions']) {
      console.log('Nouvelle valeur de conventions :', this.conventions);
      this.cdr.detectChanges(); // Force la mise à jour de la vue
    }
  }
  ngOnInit() {
    console.log('Valeur reçue du parent:', this.conventions);

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
  //         this.gererConventionsServiceService.desactiverCompte(itemId).subscribe(data => {
  //           this.gererConventionsServiceService.getUtilisateurs().subscribe(data => {
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


  telechargerConvention() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // 1. Vérifier si l'objet user est vide
    if (Object.keys(user).length === 0) {
      Swal.fire('Erreur', 'Aucune donnée utilisateur trouvée.', 'error');
      return;
    }

    // 2. Liste de TOUS les attributs (obligatoires + optionnels)
    const allAttributes = [
      'id', 'nom', 'prenom', 'email', 'cin', 'filiere', 'niveau', 'formation', 'tel'
    ];

    // 3. Vérifier chaque attribut (même les optionnels)
    const invalidAttributes = allAttributes.filter(attr => {
      const value = user[attr];
      // Vérifie si null, undefined, chaîne vide, ou objet role sans ID
      return (
        value === null ||
        value === undefined ||
        value === "" ||
        (attr === 'role' && !user.role?.id) ||
        (attr === 'cin' && isNaN(value))
      );
    });

    // 4. Si au moins un attribut est invalide
    if (invalidAttributes.length > 0) {
      Swal.fire({
        title: 'Profil incomplet',
        html: `
          <div>
            <p>Vous ne pouvez pas télécharger votre convention.</p>
            <p class="text-danger">Attributs invalides ou manquants :</p>
            <p>${invalidAttributes.join(', ')}</p>
          </div>
        `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Mettre à jour mon profil',
        cancelButtonText: 'Annuler',
        reverseButtons: true,
        customClass: {
          popup: 'swal2-popup-custom' // Optionnel : pour du CSS personnalisé
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/profile']);
        } else {
          Swal.fire('Annulé', 'Action annulée.', 'info');
        }
      });
      return;
    }

    // 5. Si tout est valide, lancer le téléchargement
    this.gererConventionsServiceService.downloadPdf(user.id);
    this.gererConventionsServiceService.downloadWord(user.id);


  }
  downloadPreuveAnnulation(nomFichier: string) {
    const fileUrl = `http://localhost:8081/api/conventionStagEte/uploads/${nomFichier}`;

    fetch(fileUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
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
      .catch(error => {
        console.error("Erreur lors du téléchargement :", error);
        Swal.fire('Erreur', 'Impossible de télécharger le fichier', 'error');
      });
  }
  openAnnulationModal(conventionId: number) {
    this.currentConventionId = conventionId;
    this.modalService.open(this.annulationModal);
  }






}