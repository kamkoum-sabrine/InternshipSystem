// import { Component } from '@angular/core';

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ColDirective, InputGroupComponent, InputGroupTextDirective } from '@coreui/angular-pro';
import {

  MultiSelectComponent as MultiSelectComponent_1,
  MultiSelectOptgroupComponent,
  MultiSelectOptionComponent,

} from '@coreui/angular-pro';
import { GererSoutenancesService } from '../soutenances-basic-example/gerer-soutenances.service';


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
    RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormControlDirective, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ColDirective, InputGroupComponent, InputGroupTextDirective,
    RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, MultiSelectComponent_1, MultiSelectOptionComponent, MultiSelectOptgroupComponent
  ],
  templateUrl: './add-user-dialog.component.html',
  //styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent {

  errorMessage: string | null = null;
  etudiants: any[] = [];
  encadrants: any[] = [];
  jurys: any[] = [null];

  soutenance = {
    date: '',
    heure: '',
    salle: '',
    etudiantId: '',
    encadrantId: '',
    juryIds: [],
    sujet: ''
  };

  constructor(private gererSoutenancesService: GererSoutenancesService,
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.gererSoutenancesService.getEtudiants().subscribe((data) => {
      this.etudiants = data;
    });
    this.gererSoutenancesService.getEncadrants().subscribe((data) => {
      this.encadrants = data;
    });

  }

  // Fermer le modal sans enregistrer
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Soumettre le formulaire
  onSubmit(): void {
    console.log('Soutenance créée:', this.soutenance);

    this.gererSoutenancesService.addSoutenance(this.soutenance).subscribe(
      (response) => {
        console.log('Soutenance enregistrée avec succès:', response);
        this.dialogRef.close(this.soutenance); // Ferme le modal et retourne l'objet soutenance
        window.location.reload(); // Recharge la page
      },
      (error) => {
        this.errorMessage = 'Une conflit est survenue lors de l\'enregistrement de la soutenance.';
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message; // Récupère le message d'erreur du backend
        }
        console.error('Erreur lors de l\'enregistrement de la soutenance:', error);
      }
    );
  }




  // Ajouter un nouveau jury (ajouter un nouvel encadrant à la liste des jurys)
  addJury() {
    this.jurys.push(null);
  }

  // Supprimer un jury
  removeJury(index: number) {
    this.soutenance.juryIds.splice(index, 1);
  }
}
