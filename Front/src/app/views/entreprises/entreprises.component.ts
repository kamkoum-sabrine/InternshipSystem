import { Component, OnInit } from '@angular/core';
import { EntreprisesBasicExampleComponent } from './entreprises-basic-example/entreprises-basic-example.component';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TextColorDirective
} from '@coreui/angular-pro';
import { DocsExampleComponent } from '@docs-components/public-api';

import { EntreprisesServiceService } from './entreprises-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-entreprises',
  templateUrl: './entreprises.component.html',
  styleUrls: ['./entreprises.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, EntreprisesBasicExampleComponent, MatDialogModule, MatButtonModule]
})
export class EntreprisesComponent {
  entreprises: any;
  role: string = '';
  isService: boolean = false;
  isEtudiant: boolean = false;
  constructor(private entrepriseService: EntreprisesServiceService, public dialog: MatDialog) { }
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.role = user?.role?.nom || '';

    // Détermine le type d'utilisateur
    this.isService = this.role === 'SERVICE_STAGE';
    this.isEtudiant = this.role !== 'SERVICE_STAGE';

    this.entrepriseService.getEntreprises().subscribe(data => {
      this.entreprises = data;
      console.log(this.entreprises);
    });


  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Nouvel utilisateur:', result);
        // Logic to add the user
      }
    });
  }


}