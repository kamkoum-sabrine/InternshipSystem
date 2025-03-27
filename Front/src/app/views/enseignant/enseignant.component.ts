import { Component } from '@angular/core';
import { EnseignantBasicExampleComponent } from './enseignant-basic-example/enseignant-basic-example.component';

import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TextColorDirective
} from '@coreui/angular-pro';
import { EnseignantService } from './enseignant-service.service';
import { AddEnseignantDialogComponent } from './add-enseignant-dialog/add-enseignant-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-enseignant',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, EnseignantBasicExampleComponent, MatDialogModule, MatButtonModule],
  templateUrl: './enseignant.component.html',
  styleUrl: './enseignant.component.scss'
})
export class EnseignantComponent {

  Enseignants: any;

  constructor(private EnseignantService: EnseignantService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.EnseignantService.getEnseignants().subscribe(data => {
      this.Enseignants = data;
      console.log(this.Enseignants);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddEnseignantDialogComponent, {
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
}
