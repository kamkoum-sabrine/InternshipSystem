import { Component, OnInit } from '@angular/core';

import { SoutenancesBasicExampleComponent } from './soutenances-basic-example/soutenances-basic-example.component';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TextColorDirective
} from '@coreui/angular-pro';

import { SoutenancesServiceService } from './soutenances-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-soutenances',
  templateUrl: './soutenances.component.html',
  styleUrls: ['./soutenances.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, SoutenancesBasicExampleComponent, MatDialogModule, MatButtonModule]
})
export class SoutenancesComponent {

  soutenances: any;
  role: string = '';
  isService: boolean = false;
  isEtudiant: boolean = false;


  constructor(private SoutenancesServiceService: SoutenancesServiceService, public dialog: MatDialog) { }
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.role = user?.role?.nom || '';

    // Détermine le type d'utilisateur
    this.isService = this.role === 'SERVICE_STAGE';
    this.isEtudiant = this.role !== 'SERVICE_STAGE';

    this.SoutenancesServiceService.getSoutenances().subscribe(data => {
      this.soutenances = data;
      console.log(this.soutenances);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '600px',  // Largeur de la boîte de dialogue
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
}
