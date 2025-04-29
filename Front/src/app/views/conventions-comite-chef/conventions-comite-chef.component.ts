import { Component, OnInit, signal } from '@angular/core';
import { ConventionsComiteChefServiceService } from './conventions-comite-chef-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddConventionDialogComponent } from './add-convention-dialog/add-convention-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { IconDirective } from '@coreui/icons-angular';
import { ConventionsComiteChefBasicExampleComponent } from './conventions-comite-chef-basic-example/conventions-comite-chef-basic-example.component';
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

@Component({
  selector: 'app-conventions-comite-chef',
  standalone: true,
imports: [CommonModule, HttpClientModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ConventionsComiteChefBasicExampleComponent, MatDialogModule, MatButtonModule, TabDirective,
    TabPanelComponent,
    TabsComponent,
    TabsContentComponent,
    TabsListComponent,
    IconDirective],
      templateUrl: './conventions-comite-chef.component.html',
  styleUrl: './conventions-comite-chef.component.scss'
})
export class ConventionsComiteChefComponent {
 conventions: any;
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



  constructor( private conventionsService : ConventionsComiteChefServiceService,public dialog: MatDialog) { }
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.conventionsService.getConventions().subscribe({
      next: (data) => this.conventions = data,
      error: (err) => console.error('Erreur:', err)
    });
    this.conventionsService.getConventionsPFE().subscribe({
      next: (data) => {
        this.conventionsPFE = data
        console.log("Conventionssssssssssss ", this.conventionsPFE)
      },
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
