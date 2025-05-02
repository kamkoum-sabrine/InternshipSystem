import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AttestationsService } from '../attestations.service';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, DatePipe } from '@angular/common';
import { FormControlDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  FormDirective,
  FormFeedbackComponent,
  FormLabelDirective,
  FormSelectDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  ListGroupDirective,
  ListGroupItemDirective,
  RowComponent,
  TextColorDirective
} from '@coreui/angular-pro';
import { DocsExampleComponent } from '@docs-components/public-api';
//import { PdfService } from '../conventionsEtudiant-basic-example/pdf.service'
//import { OcrService } from '../conventionsEtudiant-basic-example/ocr.service'
import { EntreprisesServiceService } from '../../entreprises/entreprises-service.service'
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';
//import { ConventionsEtudiantService } from '../conventionsEtudiant-service.service';
//import { TuteurPFEServiceService } from './tuteur-pfeservice.service';
import { GererAttestationsService } from '../attestation-basic-example/gerer-attestations.service';

@Component({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective
  ],
  selector: 'app-add-attestation-dialog',
  standalone: true,
  templateUrl: './add-attestation-dialog.component.html',
  styleUrl: './add-attestation-dialog.component.scss'
})
export class AddAttestationDialogComponent {

  attestation: any = {
    fichierPDF: null
  };
  isSubmitDisabled: boolean = false;
  etudiantId!: number;
  isLoading: boolean = false;

  constructor(
    private service: GererAttestationsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.etudiantId = data?.etudiantId;
  }

  // Gérer la sélection du fichier
  onFileSelected(event: any) {
    this.attestation.fichierPDF = event.target.files[0];
  }

  // Soumettre le fichier
  onSubmit() {
    console.log('Début de la soumission du formulaire');

    if (!this.attestation.fichierPDF) {
      console.warn('Aucun fichier sélectionné.');
      return;
    }

    if (!this.etudiantId) {
      console.error('etudiantId est indéfini ou invalide :', this.etudiantId);
      return;
    }

    this.isLoading = true;

    const formData = new FormData();
    formData.append('file', this.attestation.fichierPDF);
    formData.append('etudiantId', this.etudiantId.toString());

    console.log('Contenu de FormData :');
    for (const pair of (formData as any).entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    this.service.uploadAttestation(formData)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log('Attestation uploadée avec succès :', response);
          window.location.reload();

        },
        error: (error) => {
          this.isLoading = false;
          console.error('Erreur lors de l\'upload de l\'attestation :', error);
          if (error.error) {
            console.error('Message d\'erreur du serveur :', error.error);
          }
        }
      });
  }

  // Annuler l'upload
  onNoClick() {
    this.attestation.fichierPDF = null;
  }
}
