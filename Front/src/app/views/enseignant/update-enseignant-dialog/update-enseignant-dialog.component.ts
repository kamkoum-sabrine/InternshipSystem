import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';  // Import de ReactiveFormsModule
import { GererEnseignatService } from '../enseignant-basic-example/gerer-enseignant-service.service';
import { RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ColDirective, InputGroupComponent, InputGroupTextDirective } from '@coreui/angular-pro';

@Component({
  selector: 'app-update-enseignant-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,  // Module form réactif ajouté ici
    RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ColDirective, InputGroupComponent, InputGroupTextDirective
  ],
  templateUrl: './update-enseignant-dialog.component.html',
  styleUrls: ['./update-enseignant-dialog.component.scss']
})
export class UpdateEnseignantDialogComponent implements OnInit {

  enseignantForm!: FormGroup;  // Déclaration du formulaire réactif
  enseignant: any = {}; // L'enseignant à modifier

  constructor(
    public dialogRef: MatDialogRef<UpdateEnseignantDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { EnseignantId: number },
    private GererEnseignatService: GererEnseignatService,
    private fb: FormBuilder // Injection du FormBuilder pour créer le formulaire
  ) { }

  ngOnInit(): void {
    // Initialiser le formulaire
    this.enseignantForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    });

    // Charger l'enseignant à partir de l'ID
    this.chargerEnseignant();
  }

  chargerEnseignant(): void {
    this.GererEnseignatService.getEnseignantById(this.data.EnseignantId).subscribe(
      (data) => {
        this.enseignant = data;

        // Mettre à jour le formulaire avec les données de l'enseignant
        this.enseignantForm.patchValue({
          nom: this.enseignant.nom,
          prenom: this.enseignant.prenom,
          email: this.enseignant.email
        });
      },
      (error) => {
        console.error('Erreur lors du chargement de l enseignant', error);
      }
    );
  }

  onSubmit(): void {
    if (this.enseignantForm.valid) {
      this.GererEnseignatService.updateSoutenance(this.enseignantForm.value).subscribe(
        (response) => {
          console.log('Soutenance modifiée avec succès', response);
          this.dialogRef.close(true);
          window.location.reload();
        },
        (error) => {
          console.error('Erreur lors de la modification', error);
        }
      );
    } else {
      console.log("Le formulaire est invalide");
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
