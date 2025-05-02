import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Ajoutez cet import
import { AddconventiondialogComponent } from '../addconventiondialog/addconventiondialog.component';
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
import usersData from '../_data';

import Swal from 'sweetalert2';
import{AttestationsService} from '../attestations.service';
import { GererAttestationsService } from './gerer-attestations.service';
@Component({
  selector: 'app-attestation-service-basic-example',
  standalone: true,
  imports: [CommonModule, BadgeComponent, ButtonDirective, CollapseDirective, SmartTableComponent, TemplateIdDirective, TextColorDirective],
  templateUrl: './attestation-service-basic-example.component.html',
  styleUrl: './attestation-service-basic-example.component.scss'
})
export class AttestationServiceBasicExampleComponent {
  usersData = usersData;
  @Input() attestations: any[] = [];
  @Input() tabs: any;

  @ViewChild('annulationModal') annulationModal!: TemplateRef<any>; // Ajoutez cette ligne

  selectedFile: File | null = null;
  currentConventionId: number | null = null;

  columns: IColumn[] = [
    {
      key: 'etudiant',
      label: 'Etudiant'
    },

    {
      key: 'nomFichier',
      label: 'Attestation déposée'
    },

    {
      key: 'dateDepot',
      label: 'Date de dépot',
    },

    
  ];
  details_visible = Object.create({});

  constructor(private cdr: ChangeDetectorRef, private router: Router, private gservice:GererAttestationsService, public dialog: MatDialog, private modalService: NgbModal, private service : AttestationsService) { }

  downloadPDF(attestationId: number) {
    this.service.downloadAttestation(attestationId).subscribe({
      next: (response) => {
        // Crée un objet Blob à partir de la réponse et crée un lien de téléchargement
        const blob = new Blob([response.body!], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `attestation_${attestationId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Erreur lors du téléchargement :', err);
        Swal.fire('Erreur', 'Il y a eu un problème lors du téléchargement du fichier.', 'error');
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['conventions']) {
      console.log('Nouvelle valeur de conventions :', this.attestations);
      this.cdr.detectChanges(); // Force la mise à jour de la vue
    }
  }
  ngOnInit() {
    console.log('Valeur reçue du parent:', this.attestations);

  }



  openDialog(): void {
    const dialogRef = this.dialog.open(AddconventiondialogComponent, {
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
  downloadPDFe(nomFichier: string) {
    let fileUrl;
    if (this.tabs == 0) {
      fileUrl = `http://localhost:8081/api/conventionStagEte/uploads/${nomFichier}`;

    }
    else {
      fileUrl = `http://localhost:8081/api/conventionStagPFE/uploads/${nomFichier}`;

    }
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
  approuverConvention(id: any) {
    console.log(this.tabs);
    if (this.tabs == 0) {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Voulez vous valider cette conventions',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, valider!',
        cancelButtonText: 'Annuler',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.validerConvention(id).subscribe(data => {
            console.log(data);
            this.service.getConventions().subscribe(data => {
              this.attestations= data
            });

          });
          Swal.fire('Covention validée !', '', 'success');
          // Ajouter la logique de confirmation ici
        } else if (result.isDismissed) {
          // L'événement est annulé
          Swal.fire('Validation annulé', '', 'info');
        }
      });
    } else {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Voulez vous valider cette conventions',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, valider!',
        cancelButtonText: 'Annuler',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.validerConventionPFE(id).subscribe(data => {
            console.log(data);
            this.service.getConventionsPFE().subscribe(data => {
              this.attestations = data
            });

          });
          Swal.fire('Covention validée !', '', 'success');
          // Ajouter la logique de confirmation ici
        } else if (result.isDismissed) {
          // L'événement est annulé
          Swal.fire('Validation annulé', '', 'info');
        }
      });
    }

  }
  openDialogRemarque(id: number): void {
    const dialogRef = this.dialog.open(AddconventiondialogComponent, {
      width: '600px',
      minWidth: '600px',  // Largeur minimale de 400px
      maxWidth: '600px',
      data: { id: id, tabs: this.tabs }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Editer utilisateur:', result);
      }
    });

  }


  telechargerConvention() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (Object.keys(user).length === 0) {
      Swal.fire('Erreur', 'Aucune donnée utilisateur trouvée.', 'error');
      return;
    }

    const allAttributes = [
      'id', 'nom', 'prenom', 'email', 'cin', 'filiere', 'niveau', 'formation', 'tel'
    ];

    const invalidAttributes = allAttributes.filter(attr => {
      const value = user[attr];
      return (
        value === null ||
        value === undefined ||
        value === "" ||
        (attr === 'role' && !user.role?.id) ||
        (attr === 'cin' && isNaN(value))
      );
    });

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
          popup: 'swal2-popup-custom'
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
    this.gservice.downloadPdf(user.id);
    this.gservice.downloadWord(user.id);


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
