// import { Component } from '@angular/core';

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './add-user-dialog.component.html',
  //styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent {
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

  // Soumettre le formulaire
  onSubmit() {
    console.log('Form submitted', this.user);
    // Logique pour traiter le formulaire
  }
}
