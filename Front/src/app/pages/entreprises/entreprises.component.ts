import { Component, OnInit } from '@angular/core';
import { EntreprisesService } from './entreprises-service.service';

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprises.component.html',
  styleUrls: ['./entreprises.component.css']
})
export class EntreprisesComponent implements OnInit {
  entreprises: any[] = [];

  constructor(private entrepriseService: EntreprisesService) {}

  ngOnInit(): void {
    this.getEntreprises();
  }

  // Fetch entreprises from the backend
  getEntreprises(): void {
    this.entrepriseService.getEntreprises().subscribe(
      (data) => {
        this.entreprises = data;
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  editEntreprise(entreprise: any): void {
    console.log('Editing:', entreprise);
    // Implement logic for editing the enterprise
  }

  deleteEntreprise(entreprise: any): void {
    this.entrepriseService.deleteEntreprise(entreprise.id).subscribe(
      () => {
        this.entreprises = this.entreprises.filter(e => e.id !== entreprise.id);
      },
      (error) => {
        console.error('Erreur lors de la suppression de l’entreprise !', error);
      }
    );
  }
  
}
