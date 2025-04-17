import { Component, OnInit, signal } from '@angular/core';
import { ConventionsServiceBasicExampleComponent } from './conventionsService-basic-example/conventionsService-basic-example.component';
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

import { ConventionsServiceService } from './conventionsService-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddConventionDialogComponent } from './add-convention-dialog/add-convention-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { IconDirective } from '@coreui/icons-angular';
@Component({
  selector: 'app-conventionsService',
  templateUrl: './conventionsService.component.html',
  styleUrls: ['./conventionsService.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ConventionsServiceBasicExampleComponent, MatDialogModule, MatButtonModule, TabDirective,
    TabPanelComponent,
    TabsComponent,
    TabsContentComponent,
    TabsListComponent,
    IconDirective]
})
export class ConventionsServiceComponent implements OnInit {
  conventions: any;
  public panes = [
    { name: 'Stage été', id: 'tab-01', icon: 'cilHome' },
    { name: 'Stage PFE', id: 'tab-02', icon: 'cilUser' },
    // { name: 'Contact 03', id: 'tab-03', icon: 'cilCode' }
  ];

  activeItem = signal(0);

  handleActiveItemChange(value: string | number | undefined) {
    this.activeItem.set(<number>value);
  }



  constructor(private conventionsServicesService: ConventionsServiceService, public dialog: MatDialog) { }
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    this.conventionsServicesService.getConventions().subscribe({
      next: (data) => this.conventions = data,
      error: (err) => console.error('Erreur:', err)
    });
    // this.conventionsServicesService.getMesConventions(user.id).subscribe(data => {
    //   this.conventions = data;
    //   console.log(this.conventions);
    // });
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
