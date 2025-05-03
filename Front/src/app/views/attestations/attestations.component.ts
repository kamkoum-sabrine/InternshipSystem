import { Component, OnInit, signal } from '@angular/core';

import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RoundedDirective,
  RowComponent,
  TabDirective,
  TabPanelComponent,
  TabsComponent,
  TabsContentComponent,
  TabsListComponent,
  TextColorDirective
} from '@coreui/angular-pro';
//import { DocsExampleComponent } from '@docs-components/public-api';
import { AttestationsService } from './attestations.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddAttestationDialogComponent } from './add-attestation-dialog/add-attestation-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { IconDirective } from '@coreui/icons-angular';
import { AttestationBasicExampleComponent } from './attestation-basic-example/attestation-basic-example.component';
@Component({
  selector: 'app-attestations',
  templateUrl: './attestations.component.html',
  styleUrls: ['./attestations.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, AttestationBasicExampleComponent, MatDialogModule, MatButtonModule, CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    ColComponent,
    RoundedDirective,
    TabDirective,
    TabPanelComponent,
    TabsComponent,
    TabsContentComponent,
    TabsListComponent,
    IconDirective]
})
export class AttestationsComponent implements OnInit {
  myAttestations: any;
  myConventionsPFE: any;
  public panes = [
    { name: 'Stage été', id: 'tab-01', icon: 'cilHome' },
    { name: 'Stage PFE', id: 'tab-02', icon: 'cilUser' },
    // { name: 'Contact 03', id: 'tab-03', icon: 'cilCode' }
  ];

  activeItem = signal(0);

  handleActiveItemChange(value: string | number | undefined) {
    this.activeItem.set(<number>value);
  }


  constructor(private service: AttestationsService, public dialog: MatDialog) { }
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    this.service.getMyAttestation(user.id).subscribe(data => {
      this.myAttestations = data;
      console.log(this.myAttestations);
    });

    this.service.getMesConventionsPFE(user.id).subscribe(data => {
      this.myConventionsPFE = data;
      console.log(this.myConventionsPFE);
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

    const dialogRef = this.dialog.open(AddAttestationDialogComponent, {
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
