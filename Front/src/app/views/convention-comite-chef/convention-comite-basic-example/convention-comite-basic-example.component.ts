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
import { ConventionComiteService } from '../convention-comite.service';
import usersData from '../_data';
import { GererConventionsService } from './gerer-conventions.service';

@Component({
  selector: 'app-conventionsComite-basic-example',
  templateUrl:'convention-comite-basic-example.component.html',
  styleUrls: ['./convention-comite-basic-example.component.scss'],
  standalone: true,
  imports: [CommonModule, BadgeComponent, ButtonDirective, CollapseDirective, SmartTableComponent, TemplateIdDirective, TextColorDirective]
})
export class ConventionComiteBasicExampleComponent implements OnInit {

  usersData = usersData;
  @Input() conventions: any[] = [];;
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

  constructor(private cdr: ChangeDetectorRef, private router: Router, private gservice: GererConventionsService, public dialog: MatDialog, private modalService: NgbModal, private service: ConventionComiteService) { }



  ngOnChanges(changes: SimpleChanges) {
    if (changes['conventions']) {
      console.log('Nouvelle valeur de conventions :', this.conventions);
      this.cdr.detectChanges();
    }
  }

  ngOnInit() {
    console.log('Valeur reçue du parent:', this.conventions);
  }

  getBadge(status: number) {
    switch (status) {
      case 1: return 'success';
      case -1: return 'danger';
      case 0: return 'warning';
      default: return 'primary';
    }
  }



  openDialog(): void {
    const dialogRef = this.dialog.open(AddConventionDialogComponent, {
      width: '600px',
      minWidth: '600px',
      maxWidth: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Nouvelle soutenance:', result);
      }
    });
  }

  downloadPDF(nomFichier: string) {
    let fileUrl;
    if (this.tabs == 0) {
      fileUrl = `http://localhost:8081/api/conventionStagEte/uploads/${nomFichier}`;
    } else {
      fileUrl = `http://localhost:8081/api/conventionStagPFE/uploads/${nomFichier}`;
    }
    
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
      .catch(error => console.error("Erreur lors du téléchargement :", error));
  }


  getItem(item: any) {
    console.log("item " + item)
  }
  

  toggleDetails(itemId: number) {
    console.log("Avant :", this.details_visible[itemId]);

    // Initialiser à false si non défini, puis inverser
    this.details_visible[itemId] = !this.details_visible[itemId];

    console.log("Après :", this.details_visible[itemId]);
  }
  
  annulerDemande(id: any) {
    console.log("Id de la convention à annuler ", id);
  }
  getDate(dateDepot: any) {
    const formattedDate = dateDepot.split("T")[0] + " " + dateDepot.split("T")[1].split(".")[0];
    return formattedDate;
  }

  approuverConvention(id: any) {
    console.log(this.tabs);
    if (this.tabs == 0) {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Voulez-vous valider cette convention en tant que comité?',
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
              this.conventions = data;
            });
          });
          Swal.fire('Convention validée par le comité !', '', 'success');
        } else if (result.isDismissed) {
          Swal.fire('Validation annulée', '', 'info');
        }
      });
    } else {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Voulez-vous valider cette convention en tant que comité?',
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
              this.conventions = data;
            });
          });
          Swal.fire('Convention validée par le comité !', '', 'success');
        } else if (result.isDismissed) {
          Swal.fire('Validation annulée', '', 'info');
        }
      });
    }
  }
   
   
    openDialogRemarque(id: number): void {
      const dialogRef = this.dialog.open(AddConventionDialogComponent, {
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