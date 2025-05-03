import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent,
  CardBodyComponent, FormControlDirective, FormDirective, FormLabelDirective,
  FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective,
  ButtonDirective, ColDirective, InputGroupComponent, InputGroupTextDirective
} from '@coreui/angular-pro';

import { GererEnseignatService } from '../enseignant-basic-example/gerer-enseignant-service.service';
import { EnseignantService } from '../enseignant-service.service';

@Component({
  selector: 'app-add-enseignant-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    FormsModule, ReactiveFormsModule,
    RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent,
    CardBodyComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective,
    FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective,
    ButtonDirective, ColDirective, InputGroupComponent, InputGroupTextDirective
  ],
  templateUrl: './add-enseignant-dialog.component.html',
  styleUrl: './add-enseignant-dialog.component.scss'
})
export class AddEnseignantDialogComponent implements OnInit {

  enseignantForm: FormGroup;
  emailsExistants: string[] = [];
  emailExistant: boolean = false;

  constructor(
    private fb: FormBuilder,
    private gererEnseignatService: GererEnseignatService,
    private enseignatService: EnseignantService,
    public dialogRef: MatDialogRef<AddEnseignantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.enseignantForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.getEmails();
  }

  getEmails(): void {
    this.enseignatService.getEnseignants().subscribe(
      (enseignants: any[]) => {
        this.emailsExistants = enseignants
          .map(e => e.email?.toLowerCase()?.trim())
          .filter(email => !!email); // garde uniquement les emails valides
      },
      error => {
        console.error("Erreur lors du chargement des emails existants", error);
      }
    );
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const { email } = this.enseignantForm.value;
    const emailLower = email?.toLowerCase().trim();

    if (this.emailsExistants.includes(emailLower)) {
      this.emailExistant = true;
      return;
    }

    this.emailExistant = false;

    if (this.enseignantForm.valid) {
      const enseignantData = this.enseignantForm.value;

      this.gererEnseignatService.addEnseignant(enseignantData).subscribe(
        response => {
          console.log('Enseignant ajouté avec succès:', response);
          this.dialogRef.close(enseignantData);
          window.location.reload();
        },
        error => {
          console.error('Erreur lors de l\'ajout de l\'enseignant:', error);
        }
      );
    } else {
      console.log("Le formulaire est invalide");
    }
  }
}
