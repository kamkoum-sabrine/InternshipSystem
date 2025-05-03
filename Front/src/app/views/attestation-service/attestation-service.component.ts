import { Component, Inject, OnInit, signal } from '@angular/core';
import { AttestationServiceBasicExampleComponent } from './attestation-service-basic-example/attestation-service-basic-example.component';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
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
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { IconDirective } from '@coreui/icons-angular';
@Component({
  selector: 'app-attestation-service',
  standalone: true,
     imports: [CommonModule, HttpClientModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, AttestationServiceBasicExampleComponent, MatDialogModule, MatButtonModule, TabDirective,
       TabPanelComponent,
       TabsComponent,
       TabsContentComponent,
       TabsListComponent,
       IconDirective],
  templateUrl: './attestation-service.component.html',
  styleUrl: './attestation-service.component.scss'
})
export class AttestationServiceComponent {
 attestations: any;
  conventionsPFE: any
  public panes = [
    { name: 'Stage été', id: 'tab-01', icon: 'cilHome' },
    { name: 'Stage PFE', id: 'tab-02', icon: 'cilUser' },
    // { name: 'Contact 03', id: 'tab-03', icon: 'cilCode' }
  ];

  activeItem = signal(0);

  handleActiveItemChange(value: string | number | undefined) {
    this.activeItem.set(<number>value);
  }



  constructor(private service: AttestationsService, @Inject(MatDialog) private dialog: MatDialog) { }
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.service.getAttestations().subscribe({
      next: (data) => this.attestations = data,
      error: (err) => console.error('Erreur:', err)
    });
   
    // this.conventionsServicesService.getMesConventions(user.id).subscribe(data => {
    //   this.conventions = data;
    //   console.log(this.conventions);
    // });
  }

 }