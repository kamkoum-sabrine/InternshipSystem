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
import {

  MultiSelectComponent as MultiSelectComponent_1,
  MultiSelectOptgroupComponent,
  MultiSelectOptionComponent,

} from '@coreui/angular-pro';


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
    RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormControlDirective, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ColDirective, InputGroupComponent, InputGroupTextDirective,
    RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, MultiSelectComponent_1, MultiSelectOptionComponent, MultiSelectOptgroupComponent
  ],
  templateUrl: './add-enseignant-dialog.component.html',
  styleUrl: './add-enseignant-dialog.component.scss'
})
export class AddEnseignantDialogComponent {

  enseignant = {
    nom: '',
    prenom: '',
    email: '',
  };

  constructor(private GererEnseignatService: GererEnseignatService,
    public dialogRef: MatDialogRef<AddEnseignantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log('Soutenance créée:', this.enseignant);

    // Enregistrer la soutenance via le service
    this.GererEnseignatService.addEnseignant(this.enseignant).subscribe(
      response => {
        console.log('Soutenance enregistrée avec succès:', response);
        this.dialogRef.close(this.enseignant);
        window.location.reload();
      },
      error => {
        console.error('Erreur lors de l\'enregistrement de la soutenance:', error);
      }
    );
  }
}
