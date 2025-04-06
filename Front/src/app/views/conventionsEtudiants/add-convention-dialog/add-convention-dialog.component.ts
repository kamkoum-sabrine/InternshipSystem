// import { Component } from '@angular/core';

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, DatePipe } from '@angular/common';
import { FormControlDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, FormDirective, FormFeedbackComponent, FormLabelDirective, FormSelectDirective, InputGroupComponent, InputGroupTextDirective, ListGroupDirective, ListGroupItemDirective, RowComponent, TextColorDirective } from '@coreui/angular-pro';
import { DocsExampleComponent } from '@docs-components/public-api';
import { GererConventionsEtudiantService } from '../conventionsEtudiant-basic-example/gerer-conventionsEtudiant.service';
import { PdfService } from '../conventionsEtudiant-basic-example/pdf.service'
import { OcrService } from '../conventionsEtudiant-basic-example/ocr.service'
import { EntreprisesServiceService } from '../../entreprises/entreprises-service.service'
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';
import { ConventionsEtudiantService } from '../conventionsEtudiant-service.service';
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
  myConventions: any;
  isLoading = false; // Contrôle l'affichage du loader
  isSubmitDisabled = true; // Désactive le bouton "Soumettre" initialement

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
  entreprise = {
    nom: '',
    adresse: '',
    tuteur: '',
    email: '',
    telephone: '',
    representePar: ''

  }
  userId: any;
  edit: any;

  extractedText: string = '';
  constructor(private gererConventionsEtudiantService: GererConventionsEtudiantService,
    public dialogRef: MatDialogRef<AddConventionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private pdfService: PdfService, private ocrService: OcrService,
    private entrepriseService: EntreprisesServiceService, private conventionsEtudiantsService: ConventionsEtudiantService
  ) { }
  async onFileSelected(event: any) {
    this.onFileChange(event)
    const file = event.target.files[0];
    if (!file) return;

    this.isLoading = true; // Active le loader
    this.isSubmitDisabled = true; // Désactive le bouton
    const images = await this.pdfService.extractImagesFromPdf(file);
    if (images.length > 0) {
      const blob = await this.canvasToBlob(images[0]);
      const extractedText = await this.ocrService.extractText(new File([blob], "image.png"));
      this.extractedText = extractedText;
      // Traitement terminé
      this.isLoading = false;
      this.isSubmitDisabled = false; // Réactive le bouton
    }
  }
  // Méthode factice pour simuler l'extraction (à remplacer par votre code)
  private simulatePdfExtraction(file: File): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Texte extrait du PDF...");
      }, 2000); // Simule un délai de 2 secondes
    });
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

  // Fonction pour extraire une valeur entre deux clés
  extractValue(text: string, startKey: string, endKey: string): string {
    const startIndex = text.indexOf(startKey) + startKey.length;
    const endIndex = text.indexOf(endKey, startIndex);
    return text.substring(startIndex, endIndex).trim();
  }

  // Fonction pour parser TOUTES les données de l'entreprise
  parseEntrepriseData(text: string) {
    return {
      nom: this.extractValue(text, "L’établissement d’accueil :", "Adresse :"),
      adresse: this.extractValue(text, "Adresse :", "Représenté par :"),
      representePar: this.extractValue(text, "Représenté par :", "Tuteur du Stage :"),
      tuteur: this.extractValue(text, "Tuteur du Stage :", "E-mail :"),
      email: this.extractValue(text, "E-mail :", "-Tél:"),
      telephone: this.extractValue(text, "-Tél:", "-Fax :"),
      fax: this.extractValue(text, "-Fax :", "Concernant I’étudiant Stagiaire"),
    };
  }
  parseDureeData(text: string): { dateDebut: string, dateFin: string } {
    // Nettoyage du texte pour uniformiser les sauts de ligne
    const cleanText = text.replace(/\r?\n|\r/g, ' ');

    // Pattern amélioré pour capturer spécifiquement les dates
    const pattern = /Pour la durée\s*:\s*Du\s*:\s*([0-9\/]+)\s*au\s*:\s*([0-9\/]+)/i;
    const match = cleanText.match(pattern);

    if (match && match.length >= 3) {
      return {
        dateDebut: match[1].trim(),
        dateFin: match[2].trim()
      };
    }

    // Fallback si le premier pattern ne fonctionne pas
    const fallbackPattern = /Du\s*:\s*([0-9\/]+)\s*au\s*:\s*([0-9\/]+)/i;
    const fallbackMatch = cleanText.match(fallbackPattern);

    return fallbackMatch && fallbackMatch.length >= 3
      ? { dateDebut: fallbackMatch[1].trim(), dateFin: fallbackMatch[2].trim() }
      : { dateDebut: '', dateFin: '' };
  }

  // Dans votre composant/service
  prepareConventionData() {
    const rawData = this.parseDureeData(this.extractedText);

    // Conversion des dates au format ISO (yyyy-MM-dd)
    const conventionData = {
      dateDebut: this.convertToJavaDate(rawData.dateDebut),
      dateFin: this.convertToJavaDate(rawData.dateFin)
    };

    return conventionData;
  }

  private convertToJavaDate(dateString: string): string {
    if (!dateString) return '';

    // Formatage pour Java (yyyy-MM-dd)
    const [day, month, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  // Alternative avec DatePipe si disponible
  // private convertWithDatePipe(dateString: string): string {
  //   return this.datePipe.transform(dateString, 'yyyy-MM-dd');
  // }
  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.utilisateur = user
    console.log("utilisateur", user);

    console.log("userID", this.userId)
    this.conventionsEtudiantsService.getMesConventions(user.id).subscribe(data => {
      this.myConventions = data;
      console.log(this.myConventions);
    });
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
    if (this.isSubmitDisabled) return; // Empêche la soumission si désactivé

    this.entreprise = this.parseEntrepriseData(this.extractedText);
    console.log(this.entreprise); // Vérifiez les données extraites

    this.entrepriseService.checkExistenceEntreprise(this.entreprise).subscribe((data) => {
      console.log("eeeee")

      if (data.exists == false) {
        this.entrepriseService.addEntreprise(this.entreprise).subscribe((data) => {
          console.log("entreprise insére " + data.id)
          this.continuerSoumission(data.id);
        });
      }
      else {
        console.log("entreprise id ", data.entreprise.id)
        this.continuerSoumission(data.entreprise.id);
      }


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

    })
  }

  continuerSoumission(idEntreprise: any): void {
    let dureeStage = this.parseDureeData(this.extractedText);
    console.log("Durée stage extraite: ", dureeStage);

    let dureeStageCorrect = this.prepareConventionData();
    this.convention.etudiantId = this.utilisateur.id;

    console.log("Durée correcte (date): " + dureeStageCorrect.dateDebut);

    const formData = new FormData();
    formData.append('etudiantId', this.convention.etudiantId);
    formData.append('entrepriseId', idEntreprise);
    // formData.append('adresse', this.convention.adresse);
    // formData.append('representePar', this.convention.representePar);
    formData.append('tuteurStage', this.entreprise.tuteur);
    // formData.append('email', this.convention.email);
    // formData.append('telephone', this.convention.telephone);
    formData.append('dateDebut', dureeStageCorrect.dateDebut);
    formData.append('dateFin', dureeStageCorrect.dateFin);

    if (this.convention.fichierPDF instanceof File) {
      formData.append('fichierPDF', this.convention.fichierPDF, this.convention.fichierPDF.name);
    } else {
      console.error('Aucun fichier sélectionné');
      return;
    }

    console.log("formData: ", formData);

    this.gererConventionsEtudiantService.deposerConventionEtudiant(formData).subscribe(
      response => {
        console.log('Convention créée avec succès:', response);
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'La convention a été créée avec succès !',
          confirmButtonText: 'OK'
        });
        // this.conventionsEtudiantsService.getMesConventions(this.convention.etudiantId).subscribe(data => {
        //   this.myConventions = data;
        //   console.log(this.myConventions);
        // });
        this.dialogRef.close();
        window.location.reload();
        // this.conventionsEtudiantsService.getMesConventions(user.id).subscribe(data => {
        //   this.myConventions = data;
        //   console.log(this.myConventions);
        // });
        // this.dialogRef.close(this.utilisateur);
      }
    );
  }
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      // Le fichier sélectionné est stocké dans `fichierPDF`
      this.convention.fichierPDF = input.files[0];
    }
  }


}
