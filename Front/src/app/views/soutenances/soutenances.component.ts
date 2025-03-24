import { Component, OnInit } from '@angular/core';
import {
  SoutenancesDownloadableExampleComponent
} from './soutenances-downloadable-example/soutenances-downloadable-example.component';
import {
  SoutenancesSelectableExampleComponent
} from './soutenances-selectable-example/soutenances-selectable-example.component';
import { SoutenancesBasicExampleComponent } from './soutenances-basic-example/soutenances-basic-example.component';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TextColorDirective
} from '@coreui/angular-pro';
import { DocsExampleComponent } from '@docs-components/public-api';

import { SoutenancesServiceService } from './soutenances-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-soutenances',
  templateUrl: './soutenances.component.html',
  styleUrls: ['./soutenances.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, SoutenancesBasicExampleComponent, SoutenancesSelectableExampleComponent, SoutenancesDownloadableExampleComponent, MatDialogModule, MatButtonModule]
})
export class SoutenancesComponent {
  users: any;


}
