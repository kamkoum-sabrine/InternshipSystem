import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  RowComponent, ColComponent, TextColorDirective, CardComponent,
  CardHeaderComponent, CardBodyComponent, FormControlDirective,
  FormDirective, FormLabelDirective, FormSelectDirective, ButtonDirective
} from '@coreui/angular-pro';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LivrableService } from '../livrable.service';
import { TypeLivrable } from '../livrable.model';

@Component({
  selector: 'app-add-livrable-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RowComponent, ColComponent, TextColorDirective, CardComponent,
    CardHeaderComponent, CardBodyComponent, FormControlDirective, FormDirective,
    FormLabelDirective, FormSelectDirective, ButtonDirective
  ],
  templateUrl: './livrable-add-dialog.component.html',
})
export class LivrableAddDialogComponent implements OnInit {
  errorMessage: string | null = null;
  types = ['Rapport', 'Poster', 'Attestation']
  selectedFile: File | null = null;

  livrable = {
    titre: '',
    type: TypeLivrable.Rapport,
    etudiantId: 0,
    fichier: null as File | null
  };

  constructor(
    private livrablesService: LivrableService,
    public dialogRef: MatDialogRef<LivrableAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.livrable.etudiantId = user.id;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      if (!this.selectedFile.type.includes('pdf')) {
        this.errorMessage = 'Seuls les fichiers PDF sont autorisés';
        this.selectedFile = null;
        return;
      }
      this.livrable.fichier = this.selectedFile;
    }
  }

  onSubmit(): void {
    if (!this.livrable.fichier) {
      this.errorMessage = 'Veuillez sélectionner un fichier';
      return;
    }

    const formData = new FormData();
    formData.append('titre', this.livrable.titre);
    formData.append('type', this.livrable.type);
    formData.append('etudiantId', this.livrable.etudiantId.toString());
    formData.append('fichier', this.livrable.fichier);

    this.livrablesService.createLivrable(formData).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = "Erreur lors de l'envoi du livrable";
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}