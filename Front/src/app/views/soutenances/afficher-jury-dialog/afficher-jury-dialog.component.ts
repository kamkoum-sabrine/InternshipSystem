import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Input, OnInit, SimpleChanges } from '@angular/core';
import {
  BadgeComponent,
  CollapseDirective,
  IColumn,
  SmartTableComponent,
  TemplateIdDirective,
  TextColorDirective
} from '@coreui/angular-pro';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { GererSoutenancesService } from '../soutenances-basic-example/gerer-soutenances.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ColDirective, InputGroupComponent, InputGroupTextDirective } from '@coreui/angular-pro';
import {

  MultiSelectComponent as MultiSelectComponent_1,
  MultiSelectOptgroupComponent,
  MultiSelectOptionComponent,

} from '@coreui/angular-pro';
@Component({
  selector: 'app-afficher-jury-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormControlDirective, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ColDirective, InputGroupComponent, InputGroupTextDirective,
    RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, MultiSelectComponent_1, MultiSelectOptionComponent, MultiSelectOptgroupComponent
  ],
  templateUrl: './afficher-jury-dialog.component.html',
  styleUrl: './afficher-jury-dialog.component.scss'
})
export class AfficherJuryDialogComponent implements OnInit {
  jury: any[] = []; // Liste des membres du jury

  constructor(
    public dialogRef: MatDialogRef<AfficherJuryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { soutenanceId: number },
    private GererSoutenancesService: GererSoutenancesService
  ) { }

  ngOnInit(): void {
    this.chargerSoutenance();
  }

  chargerSoutenance(): void {
    this.GererSoutenancesService.getSoutenanceById(this.data.soutenanceId).subscribe(
      (data) => {
        this.jury = data.jury; // IDs des jury sélectionnés
      },
      (error) => {
        console.error('Erreur lors du chargement de la soutenance', error);
      }
    );
  }




  close(): void {
    this.dialogRef.close();
  }
}




