import { Component, OnInit } from '@angular/core';
import {
  EntreprisesDownloadableExampleComponent
} from './entreprises-downloadable-example/entreprises-downloadable-example.component';
import {
  EntreprisesSelectableExampleComponent
} from './entreprises-selectable-example/entreprises-selectable-example.component';
import { EntreprisesBasicExampleComponent } from './entreprises-basic-example/entreprises-basic-example.component';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TextColorDirective
} from '@coreui/angular-pro';
import { DocsExampleComponent } from '@docs-components/public-api';

import { EntreprisesServiceService } from './entreprises-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-entreprises',
  templateUrl: './entreprises.component.html',
  styleUrls: ['./entreprises.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, EntreprisesBasicExampleComponent, EntreprisesSelectableExampleComponent, EntreprisesDownloadableExampleComponent, MatDialogModule, MatButtonModule]
})
export class EntreprisesComponent {
  users: any;


}
