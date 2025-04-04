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
import { GererConventionsEtudiantService } from '../conventionsEtudiant-basic-example/gerer-conventionsEtudiant.service';
import { PdfService } from '../conventionsEtudiant-basic-example/pdf.service'
import { OcrService } from '../conventionsEtudiant-basic-example/ocr.service'

@Component({
  selector: 'app-add-convention-dialog',
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
  templateUrl: './add-convention-dialog.component.html',
  styleUrls: ['./add-convention-dialog.component.scss']
})
export class AddConventionDialogComponent {

  roles: any[] = [];

  utilisateur = {
    id: '',
    nom: '',
    prenom: '',
    email: '',
    cin: '',
    filiere: '',
    niveau: '',
    adresse: '',
    fax: '',
    lieuNaissance: '',
    dateNaissance: '',
    option: '',
    sexe: '',
    telephone: ''
  };
  convention = {
    etudiantId: '',
    etablissement: '',
    adresse: '',
    email: '',
    representePar: '',
    telephone: '',
    tuteurStage: '',
    dateDebut: '',
    dateFin: '',
    fichierPDF: null as File | null
  }
  userId: any;
  edit: any;

  extractedText: string = '';
  constructor(private gererConventionsEtudiantService: GererConventionsEtudiantService,
    public dialogRef: MatDialogRef<AddConventionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private pdfService: PdfService, private ocrService: OcrService
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
  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const images = await this.pdfService.extractImagesFromPdf(file);
    if (images.length > 0) {
      const blob = await this.canvasToBlob(images[0]);
      const extractedText = await this.ocrService.extractText(new File([blob], "image.png"));
      this.extractedText = extractedText;
    }
  }

  canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
    return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob!), 'image/png'));
  }
  async preprocessImage(canvas: HTMLCanvasElement): Promise<Blob> {
    const ctx = canvas.getContext("2d");
    if (!ctx) return this.canvasToBlob(canvas);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Convertir en niveaux de gris et augmenter le contraste
    for (let i = 0; i < data.length; i += 4) {
      let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      avg = avg > 128 ? 255 : 0; // Binarisation
      data[i] = data[i + 1] = data[i + 2] = avg;
    }

    ctx.putImageData(imageData, 0, 0);
    return this.canvasToBlob(canvas);
  }


  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.utilisateur = user
    console.log("utilisateur", user);

    console.log("userID", this.userId)

    // this.gererConventionsEtudiantService.getAllRoles().subscribe((data) => {
    //   this.roles = data;
    // });

  }

  // Fermer le modal sans enregistrer
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Soumettre le formulaire
  onSubmit(): void {
    this.convention.etudiantId = this.utilisateur.id
    console.log("conventionnnnnnnnnnnnnnnnnnnnn ", this.convention)
    const formData = new FormData();
    formData.append('etudiantId', this.convention.etudiantId);
    formData.append('etablissement', this.convention.etablissement);
    formData.append('adresse', this.convention.adresse);
    formData.append('representePar', this.convention.representePar);
    formData.append('tuteurStage', this.convention.tuteurStage);
    formData.append('email', this.convention.email);
    formData.append('telephone', this.convention.telephone);
    formData.append('dateDebut', this.convention.dateDebut);
    formData.append('dateFin', this.convention.dateFin);
    if (this.convention.fichierPDF instanceof File) {
      formData.append('fichierPDF', this.convention.fichierPDF, this.convention.fichierPDF.name);
    } else {
      console.error('Aucun fichier sélectionné');
      return;
    }
    console.log("formData: " + formData)
    this.gererConventionsEtudiantService.deposerConventionEtudiant(formData).subscribe(
      response => {
        console.log('Convention crée avec succès:', response);
        // this.dialogRef.close(this.utilisateur);
      })
    // console.log('Utilisateur créée:', this.utilisateur);
    // if (this.edit != true) {
    //   // Enregistrer la soutenance via le service
    //   this.gererUtilisateurService.creerUtilisateur(this.utilisateur).subscribe(
    //     response => {
    //       console.log('Utilisateur crée avec succès:', response);
    //       this.dialogRef.close(this.utilisateur);
    //       window.location.reload();
    //     },
    //     error => {
    //       console.error('Erreur lors de l\'enregistrement de l\'utilisateur: ', error);
    //     }
    //   );
    // }
    // else {
    //   console.log("Ediiiiiiiiiiiiiit")
    // }

  }
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      // Le fichier sélectionné est stocké dans `fichierPDF`
      this.convention.fichierPDF = input.files[0];
    }
  }


}
