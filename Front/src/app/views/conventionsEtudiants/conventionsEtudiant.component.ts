import { Component, OnInit } from '@angular/core';
import { ConventionsEtudiantBasicExampleComponent } from './conventionsEtudiant-basic-example/conventionsEtudiant-basic-example.component';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TextColorDirective
} from '@coreui/angular-pro';
//import { DocsExampleComponent } from '@docs-components/public-api';

import { ConventionsEtudiantService } from './conventionsEtudiant-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddConventionDialogComponent } from './add-convention-dialog/add-convention-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-conventionsEtudiant',
  templateUrl: './conventionsEtudiant.component.html',
  styleUrls: ['./conventionsEtudiant.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ConventionsEtudiantBasicExampleComponent, MatDialogModule, MatButtonModule]
})
export class ConventionsEtudiantComponent implements OnInit {
  myConventions: any;



  constructor(private conventionsEtudiantsService: ConventionsEtudiantService, public dialog: MatDialog) { }
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    this.conventionsEtudiantsService.getMesConventions(user.id).subscribe(data => {
      this.myConventions = data;
      console.log(this.myConventions);
    });
  }

  openDialog(): void {
<<<<<<< Updated upstream
    // const dialogRef = this.dialog.open(AddConventionDialogComponent, {
    //   width: '600px',
    //   minWidth: '600px',  // Largeur minimale de 400px
    //   maxWidth: '600px',
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     console.log('Nouvelle soutenance:', result);
    //     // Logic to add the user
    //   }
    // });
=======
    const dialogRef = this.dialog.open(AddConventionDialogComponent, {
      width: '600px',
      minWidth: '600px',  // Largeur minimale de 400px
      maxWidth: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Nouvelle soutenance:', result);
        // Logic to add the user
      }
    });
  }

  downloadPdf() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // 1. Vérifier si l'objet user est vide
    if (Object.keys(user).length === 0) {
      Swal.fire('Erreur', 'Aucune donnée utilisateur trouvée.', 'error');
      return;
    }

    // 2. Liste de TOUS les attributs (obligatoires + optionnels)
    const allAttributes = [
      'id', 'nom', 'prenom', 'email', 'cin', 'filiere', 'niveau',
    ];

    // 3. Vérifier chaque attribut (même les optionnels)
    const invalidAttributes = allAttributes.filter(attr => {
      const value = user[attr];
      // Vérifie si null, undefined, chaîne vide, ou objet role sans ID
      return (
        value === null ||
        value === undefined ||
        value === "" ||
        (attr === 'role' && !user.role?.id) ||
        (attr === 'cin' && isNaN(value))
      );
    });

    // 4. Si au moins un attribut est invalide
    if (invalidAttributes.length > 0) {
      Swal.fire({
        title: 'Profil incomplet',
        html: `
          <div>
            <p>Vous ne pouvez pas télécharger votre convention.</p>
            <p class="text-danger">Attributs invalides ou manquants :</p>
            <p>${invalidAttributes.join(', ')}</p>
          </div>
        `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Mettre à jour mon profil',
        cancelButtonText: 'Annuler',
        reverseButtons: true,
        customClass: {
          popup: 'swal2-popup-custom' // Optionnel : pour du CSS personnalisé
        }
      }).then((result) => {
        if (result.isConfirmed) {
          //gerermonprfil();
        } else {
          Swal.fire('Annulé', 'Action annulée.', 'info');
        }
      });
      return;
    }

    // 5. Si tout est valide, lancer le téléchargement
    this.conventionsEtudiantsService.downloadPdf(user.id);
>>>>>>> Stashed changes
  }

  downloadPdf() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.conventionsEtudiantsService.downloadPdf(user.id);
    console.log(user.id);

  }

}
