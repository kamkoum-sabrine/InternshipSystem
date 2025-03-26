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
  imports: [CommonModule, SmartTableComponent, FormsModule] // Ajout de FormsModule pour [(ngModel)]
})
export class EntreprisesBasicExampleComponent implements OnInit {
  @Input() entreprises: any[] = [];

  columns = [
    { key: 'nom', label: 'Nom de l\'entreprise' },
    { key: 'adresse', label: 'Adresse' },
    { key: 'email', label: 'Email' },
    { key: 'telephone', label: 'Téléphone' },
    { key: 'actions', label: 'Actions' },
  ];

  newEntreprise = {
    nom: '',
    adresse: '',
    email: '',
    telephone: ''
  };

  modalOuvert = false; // Gérer l'affichage du modal

  constructor(private entrepriseService: EntreprisesServiceService) {}

  ngOnInit() {
    console.log('Entreprises reçues du parent:', this.entreprises);
  }

  // Ouvrir le modal
  ouvrirModal() {
    this.modalOuvert = true;
  }

  // Fermer le modal
  fermerModal() {
    this.modalOuvert = false;
    this.newEntreprise = { nom: '', adresse: '', email: '', telephone: '' };
  }

  // Ajouter une entreprise
 // Ajouter une entreprise
ajouterEntreprise() {
  console.log("Valeurs actuelles:", this.newEntreprise); // Debug

  // Vérifie si un champ est vide
  if (Object.values(this.newEntreprise).some(value => !value?.toString().trim())) {
    alert("Tous les champs sont obligatoires !");
    return;
  }

  this.entrepriseService.addEntreprise(this.newEntreprise).subscribe(
    (data) => {
      this.entreprises.push(data); // Ajouter l'entreprise à la liste
      this.fermerModal();
    },
    (error) => {
      console.error("Erreur lors de l'ajout de l'entreprise :", error);
      alert("Erreur lors de l'ajout !");
    }
  );
}


  // Supprimer une entreprise
  deleteEntreprise(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette entreprise ?')) {
      this.entrepriseService.deleteEntreprise(id).subscribe(() => {
        this.entreprises = this.entreprises.filter(entreprise => entreprise.id !== id);
      }, error => {
        console.error("Erreur lors de la suppression de l'entreprise:", error);
      });
    }
  }
}