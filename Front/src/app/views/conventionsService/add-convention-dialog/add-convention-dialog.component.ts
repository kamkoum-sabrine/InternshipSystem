// import { Component } from '@angular/core';

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, DatePipe } from '@angular/common';
import { FormControlDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, FormDirective, FormFeedbackComponent, FormLabelDirective, FormSelectDirective, InputGroupComponent, InputGroupTextDirective, ListGroupDirective, ListGroupItemDirective, RowComponent, TextColorDirective } from '@coreui/angular-pro';
import { DocsExampleComponent } from '@docs-components/public-api';
import { GererConventionsServiceService } from '../conventionsService-basic-example/gerer-conventionsService.service';
import { PdfService } from '../conventionsService-basic-example/pdf.service'
import { OcrService } from '../conventionsService-basic-example/ocr.service'
import { EntreprisesServiceService } from '../../entreprises/entreprises-service.service'
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';
import { ConventionsServiceService } from '../conventionsService-service.service';
@Component({
  selector: 'app-add-convention-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective
  ],
  templateUrl: './add-convention-dialog.component.html',
  styleUrls: ['./add-convention-dialog.component.scss']
})
export class AddConventionDialogComponent {

  roles: any[] = [];
  myConventions: any;
  isLoading = false; // Contrôle l'affichage du loader
  isSubmitDisabled = true; // Désactive le bouton "Soumettre" initialement

  utilisateur = {
    id: '',
    nom: '',
    prenom: '',
    email: '',
    cin: '',
    filiere: '',
    niveau: '',
    adresse: '',
    fax: '',
    lieuNaissance: '',
    dateNaissance: '',
    option: '',
    sexe: '',
    telephone: ''
  };
  convention = {
    remarquesService: ''
  }
  entreprise = {
    nom: '',
    adresse: '',
    tuteur: '',
    email: '',
    telephone: '',
    representePar: ''

  }
  userId: any;
  edit: any;
  idCovention: any
  extractedText: string = '';
  constructor(private gererConventionsServiceService: GererConventionsServiceService,
    public dialogRef: MatDialogRef<AddConventionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private pdfService: PdfService, private ocrService: OcrService,
    private entrepriseService: EntreprisesServiceService, private conventionsServicesService: ConventionsServiceService
  ) {
    console.log("daaaaaataaaaa ", data.id)
    this.idCovention = data.id;
    console.log("haw hnee ", this.idCovention)
  }
  async onFileSelected(event: any) {

  }
  // Méthode factice pour simuler l'extraction (à remplacer par votre code)



  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.utilisateur = user
    console.log("utilisateur", user);

    console.log("userID", this.userId)
    // this.conventionsServicesService.getMesConventions(user.id).subscribe(data => {
    //   this.myConventions = data;
    //   console.log(this.myConventions);
    // });
    // this.gererConventionsServiceService.getAllRoles().subscribe((data) => {
    //   this.roles = data;
    // });

  }

  // Fermer le modal sans enregistrer
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Soumettre le formulaire
  onSubmit(): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Voulez vous refuser cette conventions',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, valider!',
      cancelButtonText: 'Annuler',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.conventionsServicesService.refuserConvention(this.idCovention, this.convention).subscribe(data => {
          console.log(data);
          this.conventionsServicesService.getConventions().subscribe(data => {
            // this.conventions = data
            window.location.reload()
          });

        });
        Swal.fire('Convention refusée !', '', 'success');
        // Ajouter la logique de confirmation ici
      } else if (result.isDismissed) {
        // L'événement est annulé
        Swal.fire('Refus annulé', '', 'info');
      }
    });

    // if (this.isSubmitDisabled) return; // Empêche la soumission si désactivé

    // this.entreprise = this.parseEntrepriseData(this.extractedText);
    // console.log(this.entreprise); // Vérifiez les données extraites
    // this.entrepriseService.checkExistenceEntreprise(this.entreprise).subscribe({
    //   next: (data) => {
    //     if (data.exists == false) {
    //       this.entrepriseService.addEntreprise(this.entreprise).subscribe((data) => {
    //         console.log("entreprise insére " + data.id)
    //         this.continuerSoumission(data.id);
    //       });
    //     }
    //     else {
    //       console.log("entreprise id ", data.entreprise.id)
    //       this.continuerSoumission(data.entreprise.id);
    //     }
    //   },
    //   error: (err) => {
    //     if (err.error?.error === 'INVALID_JSON_FORMAT') {
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'Format invalide',
    //         text: 'Les données de l\'entreprise sont mal formatées. Veuillez vérifier les champs saisis.'
    //       });
    //     } else {
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'Erreur',
    //         text: 'Les données de l\'entreprise sont mal formatées. Veuillez vérifier les champs saisis.'
    //       });
    //     }

    //   }
    // })



  }


  onFileChange(event: Event): void {
    // const input = event.target as HTMLInputElement;
    // if (input?.files?.length) {
    //   // Le fichier sélectionné est stocké dans `fichierPDF`
    //   this.convention.fichierPDF = input.files[0];
    // }
  }


}
