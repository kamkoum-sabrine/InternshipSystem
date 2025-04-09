
import { ChangeDetectorRef, Component,OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TextColorDirective
} from '@coreui/angular-pro';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ConventionsServiceService } from './conventions-service.service';
@Component({
  selector: 'app-conventions-service',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent,  MatDialogModule, MatButtonModule],
  templateUrl: './conventions-service.component.html',
  styleUrl: './conventions-service.component.scss'
})
export class ConventionsServiceComponent {
 myConventions: any;



  constructor(private conventionsService: ConventionsServiceService, public dialog: MatDialog,    private cdr: ChangeDetectorRef,
  ) { }
 // Assurez-vous que vous passez correctement les données au composant enfant
ngOnInit(): void {
  this.conventionsService.getConventions().subscribe(data => {
    this.myConventions = [...data]; // Crée un nouveau tableau
    console.log('Data received:', this.myConventions);
    this.cdr.detectChanges();
  });
  }}