import { Component, OnInit } from '@angular/core';
import { UtilisateursBasicExampleComponent } from './utilisateurs-basic-example/utilisateurs-basic-example.component';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TextColorDirective
} from '@coreui/angular-pro';
import { DocsExampleComponent } from '@docs-components/public-api';

import { UtilisateursService } from './utilisateurs-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, UtilisateursBasicExampleComponent, MatDialogModule, MatButtonModule]
})
export class UtilisateursComponent implements OnInit {
  users: any;

  constructor(private utilisateursService: UtilisateursService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.utilisateursService.getUtilisateurs().subscribe(data => {
      this.users = data;
      console.log(this.users);
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
