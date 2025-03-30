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

import { GererEnseignatService } from '../enseignant-basic-example/gerer-enseignant-service.service';

@Component({
  selector: 'app-update-enseignant-dialog',
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
  templateUrl: './update-enseignant-dialog.component.html',
  styleUrl: './update-enseignant-dialog.component.scss'
})
export class UpdateEnseignantDialogComponent implements OnInit {

  enseignant: any = {};

  constructor(
    public dialogRef: MatDialogRef<UpdateEnseignantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { EnseignantId: number },
    private GererEnseignatService: GererEnseignatService
  ) { }

  ngOnInit(): void {
    this.chargerEnseignant();
  }

  chargerEnseignant(): void {
    this.GererEnseignatService.getEnseignantById(this.data.EnseignantId).subscribe(
      (data) => {
        this.enseignant = data;


      },
      (error) => {
        console.error('Erreur lors du chargement de l enseignant', error);
      }
    );
  }

  onSubmit(): void {
    this.GererEnseignatService.updateSoutenance(this.enseignant).subscribe(
      (response) => {
        console.log('Soutenance modifiée avec succès', response);
        this.dialogRef.close(true);
        window.location.reload();
      },
      (error) => {
        console.error('Erreur lors de la modification', error);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
