import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TextColorDirective
} from '@coreui/angular-pro';
//import { AddLivrableDialogComponent } from './add-livrable-dialog/add-livrable-dialog.component';
import { LivrableService } from './livrable.service';
import { LivrablesBasicExampleComponent } from './livrable-basic-example/livrable-basic-example.component';

@Component({
  selector: 'app-livrables',
  templateUrl: './livrables.component.html',
  styleUrls: ['./livrables.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    LivrablesBasicExampleComponent
  ]
})
export class LivrablesComponent {
  livrables: any;
  role: string = '';
  isService: boolean = false;
  isEtudiant: boolean = false;

  constructor(
    private livrablesService: LivrableService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.role = user?.role?.nom || '';

    // Détermine le type d'utilisateur
    this.isService = this.role === 'SERVICE_STAGE';
    this.isEtudiant = this.role !== 'SERVICE_STAGE';

    this.loadLivrables();

  }

  loadLivrables() {
    this.livrablesService.getLivrables().subscribe(data => {
      this.livrables = data;
    });
  }

}