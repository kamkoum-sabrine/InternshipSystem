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
import { GererConventionsDirectionEnicarService } from '../conventionsDirectionEnicar-basic-example/gerer-conventionsDirectionEnicar.service';
import { EntreprisesServiceService } from '../../entreprises/entreprises-service.service'
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';
import { ConventionsDirectionEnicarService } from '../conventionsDirectionEnicar-service.service';
import { GererConventionsServiceService } from '../../conventionsService/conventionsService-basic-example/gerer-conventionsService.service';
import { ConventionsServiceService } from '../../conventionsService/conventionsService-service.service';
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
  tabs: any;
  constructor(private gererConventionsServiceService: GererConventionsServiceService,
    public dialogRef: MatDialogRef<AddConventionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private entrepriseService: EntreprisesServiceService, private conventionsServicesService: ConventionsServiceService
  ) {
    console.log("daaaaaataaaaa ", data.id)
    this.idCovention = data.id;
    this.tabs = data.tabs;
  }


  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.utilisateur = user
    console.log("utilisateur", user);

    console.log("userID", this.userId)

  }

  // Fermer le modal sans enregistrer
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Soumettre le formulaire
  onSubmit(): void {
    if (this.tabs == 0) {
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
    }
    else {
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
          this.conventionsServicesService.refuserConventionPFE(this.idCovention, this.convention).subscribe(data => {
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
    }

  }



}
