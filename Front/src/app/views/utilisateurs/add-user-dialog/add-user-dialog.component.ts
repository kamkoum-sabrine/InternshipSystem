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
  customStylesValidated = false;
  browserDefaultsValidated = false;
  tooltipValidated = false;

  // user = {
  //   name: '',
  //   email: ''
  // };

  // constructor(
  //   public dialogRef: MatDialogRef<AddUserDialogComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: any
  // ) { }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  // onSave(): void {
  //   // Logic to save the user
  //   console.log('User added:', this.user);
  //   this.dialogRef.close(this.user);
  // }
  user = { nom: '', prenom: '', email: '' };

  constructor() { }

  // Ouvrir le modal
  openModal() {
    // Appel la méthode open() du modal
    const modal = document.querySelector('app-modal') as any;
    modal.open();
  }

  onModalClose() {
    // Action après la fermeture du modal
    console.log('Modal fermé');
  }


  onSubmit1() {
    this.customStylesValidated = true;
    console.log('Submit... 1');
  }

  onReset1() {
    this.customStylesValidated = false;
    console.log('Reset... 1');
  }
  role: 'student' | 'employee' = 'student';

  selectRole(role: 'student' | 'employee') {
    this.role = role;
  }

  onSubmit() {
    // Traitement de la création du compte ici
    console.log('Formulaire soumis');
  }
}
