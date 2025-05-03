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

  constructor(
    private livrablesService: LivrableService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadLivrables();
  }

  loadLivrables() {
    this.livrablesService.getLivrables().subscribe(data => {
      this.livrables = data;
    });
  }

}