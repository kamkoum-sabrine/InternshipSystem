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
  }

  downloadPdf() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.conventionsEtudiantsService.downloadPdf(user.id);
    console.log(user.id);

  }

}
