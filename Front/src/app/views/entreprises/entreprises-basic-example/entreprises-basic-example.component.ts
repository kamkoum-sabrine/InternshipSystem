import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SmartTableComponent } from '@coreui/angular-pro';
import { EntreprisesServiceService } from '../entreprises-service.service';

@Component({
  selector: 'app-entreprises-basic-example',
  templateUrl: './entreprises-basic-example.component.html',
  styleUrls: ['./entreprises-basic-example.component.scss'],
  standalone: true,
  imports: [CommonModule, SmartTableComponent, FormsModule]
})
export class EntreprisesBasicExampleComponent implements OnInit {
  @Input() entreprises: any[] = [];

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

  ouvrirModal() {
    console.log("🔍 Ouverture du modal d'ajout");
    this.modalOuvert = true;
  }

  fermerModal() {
    console.log("🔍 Fermeture du modal d'ajout");
    this.modalOuvert = false;
    this.newEntreprise = { nom: '', adresse: '', email: '', telephone: '' };
  }

  // Ajoutez cette méthode dans la classe EntreprisesBasicExampleComponent
telephoneExisteDeja(telephone: string): boolean {
  return this.entreprises.some(entreprise => 
    entreprise.telephone === telephone
  );
}

// Modifiez la méthode ajouterEntreprise()
ajouterEntreprise() {
  console.log("Valeurs actuelles:", this.newEntreprise);

  if (Object.values(this.newEntreprise).some(value => !value?.toString().trim())) {
    alert("Tous les champs sont obligatoires !");
    return;
  }

  // Vérification de l'unicité de l'email
  if (this.emailExisteDeja(this.newEntreprise.email)) {
    alert("Cette adresse email est déjà utilisée par une autre entreprise !");
    return;
  }

  // Vérification de l'unicité du téléphone
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
      // Double-clic détecté
      console.log("🔍 Double-clic sur l'entreprise :", entreprise);
      this.entrepriseSelectionnee = entreprise;
    } else {
      // Premier clic, enregistrer l'ID et attendre le second clic
      this.lastClickedId = entrepriseId;

      if (this.doubleClickTimeout) {
        clearTimeout(this.doubleClickTimeout);  // Annuler le délai précédent si c'est un nouveau clic
      }

      // Attendre 300ms pour voir si c'est un double-clic
      this.doubleClickTimeout = setTimeout(() => {
        this.lastClickedId = null;  // Réinitialiser après le délai
      }, 300);  // Délai de 300ms pour un double-clic
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

 // Modifiez la méthode mettreAJourEntreprise()
 mettreAJourEntreprise() {
  // Vérification des champs obligatoires
  if (Object.values(this.editedEntreprise).some(value => !value?.toString().trim())) {
    alert("Tous les champs sont obligatoires !");
    return;
  }

  if (!this.editedEntreprise.id) {
    console.error("❌ ID invalide !");
    return;
  }

  // Vérification de l'unicité de l'email
  if (this.emailExisteDejaPourAutreEntreprise(this.editedEntreprise.id, this.editedEntreprise.email)) {
    alert("Cette adresse email est déjà utilisée par une autre entreprise !");
    return;
  }

  // Vérification de l'unicité du téléphone
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
  // Ajoutez cette méthode dans la classe EntreprisesBasicExampleComponent
emailExisteDeja(email: string): boolean {
  return this.entreprises.some(entreprise => 
    entreprise.email.toLowerCase() === email.toLowerCase()
  );
}
// Ajoutez ces méthodes dans la classe EntreprisesBasicExampleComponent
telephoneExisteDejaPourAutreEntreprise(id: number, telephone: string): boolean {
  return this.entreprises.some(entreprise => 
    entreprise.id !== id && 
    entreprise.telephone === telephone
  );
}

// Vérifie si l'email existe déjà pour une autre entreprise
emailExisteDejaPourAutreEntreprise(id: number, email: string): boolean {
  return this.entreprises.some(entreprise => 
    entreprise.id !== id && 
    entreprise.email.toLowerCase() === email.toLowerCase()
  );
}
}