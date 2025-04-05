import { Component } from '@angular/core';
import { GererEnseignatService } from '../enseignant-basic-example/gerer-enseignant-service.service';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ColDirective, InputGroupComponent, InputGroupTextDirective } from '@coreui/angular-pro';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-enseignant-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormControlDirective, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ColDirective, InputGroupComponent, InputGroupTextDirective
  ],
  templateUrl: './add-enseignant-dialog.component.html',
  styleUrl: './add-enseignant-dialog.component.scss'
})
export class AddEnseignantDialogComponent {

  enseignantForm: FormGroup;

  constructor(private fb: FormBuilder, private GererEnseignatService: GererEnseignatService,
    public dialogRef: MatDialogRef<AddEnseignantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.enseignantForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.enseignantForm.valid) {
      const enseignantData = this.enseignantForm.value; // Récupérer les données du formulaire
      console.log('Soutenance créée:', enseignantData);

      this.GererEnseignatService.addEnseignant(enseignantData).subscribe(
        response => {
          console.log('Soutenance enregistrée avec succès:', response);
          this.dialogRef.close(enseignantData);
          window.location.reload();
        },
        error => {
          console.error('Erreur lors de l\'enregistrement de la soutenance:', error);
        }
      );
    } else {
      console.log("Le formulaire est invalide");
    }
  }
}
