// import { Component } from '@angular/core';

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormControlDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, FormDirective, FormFeedbackComponent, FormLabelDirective, FormSelectDirective, InputGroupComponent, InputGroupTextDirective, ListGroupDirective, ListGroupItemDirective, RowComponent, TextColorDirective } from '@coreui/angular-pro';
import { DocsExampleComponent } from '@docs-components/public-api';
import { GererUtilisateurService } from '../utilisateurs-basic-example/gerer-utilisateur.service';
@Component({
  selector: 'app-add-user-dialog',
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
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent {

  roles: any[] = [];

  utilisateur = {
    nom: '',
    prenom: '',
    email: '',
    cin: '',
    filiere: null,
    role: '',
    niveau: null
  };
  userId: any;
  edit: any;
  constructor(private gererUtilisateurService: GererUtilisateurService,
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // this.userId = data.utilisateur
    // this.edit = data.edit
    // console.log("TYPE de userId:", typeof this.userId);
    // console.log("VALEUR de userId:", this.userId);
    // if (data.utilisateur) {
    //   console.log("undefiiiineeeeeed", this.userId)
    //   this.userId = data.utilisateur
    //   this.gererUtilisateurService.getUserById(this.userId).subscribe(data => {
    //     this.utilisateur = data;
    //     console.log('data', data)
    //     console.log(this.utilisateur)
    //   })

    // }
    // else {
    //   this.utilisateur = {
    //     nom: '',
    //     prenom: '',
    //     email: '',
    //     cin: '',
    //     filiere: '',
    //     role: ''
    //   };
    // }

  }

  ngOnInit() {


    console.log("userID", this.userId)

    this.gererUtilisateurService.getAllRoles().subscribe((data) => {
      this.roles = data;
    });

  }

  // Fermer le modal sans enregistrer
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Soumettre le formulaire
  onSubmit(): void {
    console.log('Utilisateur créée:', this.utilisateur);
    if (this.edit != true) {
      // Enregistrer la soutenance via le service
      this.gererUtilisateurService.creerUtilisateur(this.utilisateur).subscribe(
        response => {
          console.log('Utilisateur crée avec succès:', response);
          this.dialogRef.close(this.utilisateur);
          window.location.reload();
        },
        error => {
          console.error('Erreur lors de l\'enregistrement de l\'utilisateur: ', error);
        }
      );
    }
    else {
      console.log("Ediiiiiiiiiiiiiit")
    }

  }

}
