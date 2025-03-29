import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SmartTableComponent } from '@coreui/angular-pro';
import { EntreprisesServiceService } from '../entreprises-service.service';
import { read, utils } from 'xlsx';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-entreprises-basic-example',
  templateUrl: './entreprises-basic-example.component.html',
  styleUrls: ['./entreprises-basic-example.component.scss'],
  standalone: true,
  imports: [CommonModule, SmartTableComponent, FormsModule]
})
export class EntreprisesBasicExampleComponent implements OnInit {
  @Input() entreprises: any[] = [];
  isImporting = false;

  columns = [
    { key: 'nom', label: 'Nom de l\'entreprise' },
    { key: 'adresse', label: 'Adresse' },
    { key: 'email', label: 'Email' },
    { key: 'telephone', label: 'Téléphone' },
  ];

  newEntreprise = {
    nom: '',
    adresse: '',
    email: '',
    telephone: ''
  };

  editedEntreprise = {
    id: 0,
    nom: '',
    adresse: '',
    email: '',
    telephone: ''
  };

  modalOuvert = false;
  modalEditionOuvert = false;
  entrepriseSelectionnee: any = null;
  confirmationSuppressionOuverte = false;

  doubleClickTimeout: any = null;
  lastClickedId: number | null = null;

  constructor(private entrepriseService: EntreprisesServiceService) {}

  ngOnInit() {
    console.log('Entreprises reçues du parent:', this.entreprises);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Reset the input value to allow re-upload of same file
    event.target.value = '';
    
    this.isImporting = true;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = utils.sheet_to_json(worksheet);

        this.processExcelData(jsonData);
      } catch (error) {
        this.isImporting = false;
        alert("Erreur lors de la lecture du fichier Excel. Format non supporté.");
      }
    };
    reader.onerror = () => {
      this.isImporting = false;
      alert("Erreur lors de la lecture du fichier.");
    };
    reader.readAsArrayBuffer(file);
  }

  async processExcelData(excelData: any[]) {
    this.isImporting = true;
    
    if (!excelData || excelData.length === 0) {
      this.isImporting = false;
      alert("Le fichier Excel est vide ou mal formaté");
      return;
    }

    // Vérifier que le fichier a les bonnes colonnes
    const requiredColumns = ['nom', 'adresse', 'email', 'telephone'];
    const firstRow = excelData[0];
    const hasAllColumns = requiredColumns.every(col => firstRow.hasOwnProperty(col));

    if (!hasAllColumns) {
      this.isImporting = false;
      alert("Le fichier Excel doit contenir les colonnes: nom, adresse, email, telephone");
      return;
    }

    // Valider et importer chaque ligne
    let validCount = 0;
    let errorCount = 0;
    let errorMessages: string[] = [];
    let entreprisesValides: any[] = [];

    // Première passe: validation des données
    for (const [index, row] of excelData.entries()) {
      const ligne = index + 1;
      const entreprise = {
        nom: row.nom?.toString().trim() || '',
        adresse: row.adresse?.toString().trim() || '',
        email: row.email?.toString().trim().toLowerCase() || '',
        telephone: row.telephone?.toString().trim() || ''
      };

      // Validation des champs
      const errors = this.validateEntreprise(entreprise, ligne);
      if (errors.length > 0) {
        errorCount++;
        errorMessages.push(...errors);
        continue;
      }

      // Vérification des doublons dans le fichier
      const duplicateInFile = excelData.slice(0, index).some((prevRow, prevIndex) => 
        (prevRow.email?.toString().trim().toLowerCase() === entreprise.email) ||
        (prevRow.telephone?.toString().trim() === entreprise.telephone)
      );

      if (duplicateInFile) {
        errorCount++;
        errorMessages.push(`Ligne ${ligne}: Doublon dans le fichier (email ou téléphone déjà présent dans une ligne précédente)`);
        continue;
      }

      // Vérification des doublons dans la base
      if (this.emailExisteDeja(entreprise.email)) {
        errorCount++;
        errorMessages.push(`Ligne ${ligne}: Email "${entreprise.email}" déjà utilisé dans le système`);
        continue;
      }

      if (this.telephoneExisteDeja(entreprise.telephone)) {
        errorCount++;
        errorMessages.push(`Ligne ${ligne}: Téléphone "${entreprise.telephone}" déjà utilisé dans le système`);
        continue;
      }

      entreprisesValides.push(entreprise);
    }

    // Deuxième passe: import des données valides
    for (const entreprise of entreprisesValides) {
      try {
        const data = await this.entrepriseService.addEntreprise(entreprise).toPromise();
        validCount++;
        this.entreprises.push(data);
      } catch (error: unknown) {
        errorCount++;
        let errorMessage = `Erreur lors de l'ajout de l'entreprise: ${entreprise.nom}`;
        
        if (error instanceof HttpErrorResponse) {
          errorMessage += ` - ${error.error.message || error.message}`;
        } else if (error instanceof Error) {
          errorMessage += ` - ${error.message}`;
        } else {
          errorMessage += ` - Erreur inconnue`;
        }
        
        errorMessages.push(errorMessage);
      }
    }

    this.isImporting = false;
    this.showImportResult(validCount, errorCount, errorMessages);
  }

  validateEntreprise(entreprise: any, lineNumber: number): string[] {
    const errors: string[] = [];

    if (!entreprise.nom || entreprise.nom.length < 2) {
      errors.push(`Ligne ${lineNumber}: Le nom doit avoir au moins 2 caractères`);
    }

    if (!entreprise.adresse || entreprise.adresse.length < 5) {
      errors.push(`Ligne ${lineNumber}: L'adresse doit avoir au moins 5 caractères`);
    }

    if (!entreprise.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(entreprise.email)) {
      errors.push(`Ligne ${lineNumber}: Email invalide (format: exemple@domaine.com)`);
    }

    if (!entreprise.telephone || !/^[0-9]{8,}$/.test(entreprise.telephone)) {
      errors.push(`Ligne ${lineNumber}: Téléphone invalide (au moins 8 chiffres)`);
    }

    return errors;
  }

  showImportResult(validCount: number, errorCount: number, errorMessages: string[]) {
    let message = `Résultat de l'import :\n\n`;
    
    if (validCount > 0) {
      message += `✅ ${validCount} entreprise(s) ajoutée(s) avec succès\n\n`;
    }

    if (errorCount > 0) {
      message += `❌ ${errorCount} erreur(s) :\n`;
      
      // Afficher les 5 premières erreurs
      const maxErrorsToShow = 5;
      const errorsToShow = errorMessages.slice(0, maxErrorsToShow);
      
      errorsToShow.forEach(err => {
        message += `- ${err}\n`;
      });

      if (errorMessages.length > maxErrorsToShow) {
        message += `\n...et ${errorMessages.length - maxErrorsToShow} erreur(s) supplémentaires\n`;
      }

      // Conseils pour les erreurs courantes
      if (errorMessages.some(err => err.includes('déjà utilisé'))) {
        message += `\nConseil : Vérifiez les emails et téléphones en doublon`;
      }
      if (errorMessages.some(err => err.includes('invalide'))) {
        message += `\nConseil : Vérifiez le format des emails et téléphones`;
      }
    }

    // Afficher le message principal
    const userConfirmed = confirm(message);
    
    // Si beaucoup d'erreurs, proposer de voir tout le détail
    if (errorMessages.length > 5 && userConfirmed) {
      confirm(`Toutes les erreurs :\n\n${errorMessages.join('\n')}`);
    }

    // Recharger les données si au moins une entreprise a été ajoutée
    if (validCount > 0) {
      window.location.reload();
    }
  }

  ouvrirModal() {
    console.log("🔍 Ouverture du modal d'ajout");
    this.modalOuvert = true;
  }

  fermerModal() {
    console.log("🔍 Fermeture du modal d'ajout");
    this.modalOuvert = false;
    this.newEntreprise = { nom: '', adresse: '', email: '', telephone: '' };
  }

  telephoneExisteDeja(telephone: string): boolean {
    return this.entreprises.some(entreprise => 
      entreprise.telephone === telephone
    );
  }

  ajouterEntreprise() {
    console.log("Valeurs actuelles:", this.newEntreprise);

    if (Object.values(this.newEntreprise).some(value => !value?.toString().trim())) {
      alert("Tous les champs sont obligatoires !");
      return;
    }

    if (this.emailExisteDeja(this.newEntreprise.email)) {
      alert("Cette adresse email est déjà utilisée par une autre entreprise !");
      return;
    }

    if (this.telephoneExisteDeja(this.newEntreprise.telephone)) {
      alert("Ce numéro de téléphone est déjà utilisé par une autre entreprise !");
      return;
    }

    console.log("🔍 Tentative d'ajout de l'entreprise :", this.newEntreprise);

    this.entrepriseService.addEntreprise(this.newEntreprise).subscribe(
      (data) => {
        console.log("✅ Entreprise ajoutée :", data);
        this.entreprises.push(data);
        window.location.reload();
        this.fermerModal();
      },
      (error) => {
        console.error("❌ Erreur lors de l'ajout :", error);
        alert("Erreur lors de l'ajout !");
      }
    );
  }

  ouvrirModalActions(entreprise: any) {
    const entrepriseId = entreprise.item.id;
    if (this.lastClickedId === entrepriseId) {
      console.log("🔍 Double-clic sur l'entreprise :", entreprise);
      this.entrepriseSelectionnee = entreprise;
    } else {
      this.lastClickedId = entrepriseId;

      if (this.doubleClickTimeout) {
        clearTimeout(this.doubleClickTimeout);
      }

      this.doubleClickTimeout = setTimeout(() => {
        this.lastClickedId = null;
      }, 300);
    }
  }

  fermerModalActions() {
    console.log("🔍 Fermeture du modal des actions");
    this.entrepriseSelectionnee = null;
  }

  ouvrirModalEdition() {
    if (this.entrepriseSelectionnee) {
      this.editedEntreprise = {
        id: this.entrepriseSelectionnee.item.id,
        nom: this.entrepriseSelectionnee.item.nom,
        adresse: this.entrepriseSelectionnee.item.adresse,
        email: this.entrepriseSelectionnee.item.email,
        telephone: this.entrepriseSelectionnee.item.telephone
      };
      this.modalEditionOuvert = true;
    }
  }

  fermerModalEdition() {
    console.log("🔍 Fermeture du modal d'édition");
    this.modalEditionOuvert = false;
    this.editedEntreprise = { id: 0, nom: '', adresse: '', email: '', telephone: '' };
  }

  mettreAJourEntreprise() {
    if (Object.values(this.editedEntreprise).some(value => !value?.toString().trim())) {
      alert("Tous les champs sont obligatoires !");
      return;
    }

    if (!this.editedEntreprise.id) {
      console.error("❌ ID invalide !");
      return;
    }

    if (this.emailExisteDejaPourAutreEntreprise(this.editedEntreprise.id, this.editedEntreprise.email)) {
      alert("Cette adresse email est déjà utilisée par une autre entreprise !");
      return;
    }

    if (this.telephoneExisteDejaPourAutreEntreprise(this.editedEntreprise.id, this.editedEntreprise.telephone)) {
      alert("Ce numéro de téléphone est déjà utilisé par une autre entreprise !");
      return;
    }

    console.log("🔍 Tentative de mise à jour :", this.editedEntreprise);

    this.entrepriseService.updateEntreprise(this.editedEntreprise.id, this.editedEntreprise).subscribe(
      (data) => {
        console.log("✅ Entreprise mise à jour :", data);
        window.location.reload();

        const index = this.entreprises.findIndex(e => e.id === this.editedEntreprise.id);
        if (index !== -1) {
          this.entreprises[index] = data;
        }
        this.fermerModalEdition();
        this.fermerModalActions();
      },
      (error) => {
        console.error("❌ Erreur lors de la mise à jour :", error);
        alert("Erreur lors de la mise à jour !");
      }
    );
  }

  ouvrirConfirmationSuppression() {
    console.log("🔍 Ouverture du modal de confirmation");
    this.confirmationSuppressionOuverte = true;
  }

  fermerConfirmationSuppression() {
    console.log("🔍 Fermeture du modal de confirmation");
    this.confirmationSuppressionOuverte = false;
  }

  confirmerSuppression() {
    if (this.entrepriseSelectionnee) {
      const entrepriseId = this.entrepriseSelectionnee.item?.id;

      console.log("🔍 Tentative de suppression - ID :", entrepriseId);

      if (!entrepriseId) {
        console.error("❌ Erreur : ID non défini !");
        return;
      }

      this.entrepriseService.deleteEntreprise(entrepriseId).subscribe(
        () => {
          console.log("✅ Suppression réussie !");
          this.entreprises = this.entreprises.filter(entreprise => entreprise.id !== entrepriseId);
          this.fermerConfirmationSuppression();
          this.fermerModalActions();
        },
        (error) => {
          console.error("❌ Erreur lors de la suppression :", error);
        }
      );
    }
  }

  emailExisteDeja(email: string): boolean {
    return this.entreprises.some(entreprise => 
      entreprise.email.toLowerCase() === email.toLowerCase()
    );
  }

  telephoneExisteDejaPourAutreEntreprise(id: number, telephone: string): boolean {
    if (!telephone) return false;
    
    const normalizedTel = telephone.toString().trim().replace(/\D/g, '');
    
    return this.entreprises.some(entreprise => {
      if (entreprise.id === id) return false;
      const existingTel = entreprise.telephone.toString().trim().replace(/\D/g, '');
      return existingTel === normalizedTel;
    });
  }

  emailExisteDejaPourAutreEntreprise(id: number, email: string): boolean {
    return this.entreprises.some(entreprise => 
      entreprise.id !== id && 
      entreprise.email.toLowerCase() === email.toLowerCase()
    );
  }}