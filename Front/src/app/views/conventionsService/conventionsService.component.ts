import { Component, OnInit } from '@angular/core';
import { ConventionsServiceBasicExampleComponent } from './conventionsService-basic-example/conventionsService-basic-example.component';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TextColorDirective
} from '@coreui/angular-pro';
//import { DocsExampleComponent } from '@docs-components/public-api';

import { ConventionsServiceService } from './conventionsService-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddConventionDialogComponent } from './add-convention-dialog/add-convention-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-conventionsService',
  templateUrl: './conventionsService.component.html',
  styleUrls: ['./conventionsService.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ConventionsServiceBasicExampleComponent, MatDialogModule, MatButtonModule]
})
export class ConventionsServiceComponent implements OnInit {
  myConventions: any;



  constructor(private conventionsServicesService: ConventionsServiceService, public dialog: MatDialog) { }
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    this.conventionsServicesService.getMesConventions(user.id).subscribe(data => {
      this.myConventions = data;
      console.log(this.myConventions);
    });
  }

  openDialog(): void {

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





}
