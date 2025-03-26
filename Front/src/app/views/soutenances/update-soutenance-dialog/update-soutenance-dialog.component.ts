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
  selector: 'app-update-soutenance-dialog',
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
  templateUrl: './update-soutenance-dialog.component.html',
  styleUrl: './update-soutenance-dialog.component.scss'
})
export class UpdateSoutenanceDialogComponent implements OnInit {
  soutenance: any = {};
  etudiants: any[] = [];
  encadrants: any[] = [];
  jurySelectionnes: any[] = []; // Stocker les IDs des membres du jury sélectionnés

  constructor(
    public dialogRef: MatDialogRef<UpdateSoutenanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { soutenanceId: number },
    private GererSoutenancesService: GererSoutenancesService
  ) { }

  ngOnInit(): void {
    this.chargerSoutenance();
    this.chargerEtudiants();
    this.chargerEncadrants();
  }

  chargerSoutenance(): void {
    this.GererSoutenancesService.getSoutenanceById(this.data.soutenanceId).subscribe(
      (data) => {
        this.soutenance = data;
        this.jurySelectionnes = data.juryIds;

      },
      (error) => {
        console.error('Erreur lors du chargement de la soutenance', error);
      }
    );
  }

  chargerEtudiants(): void {
    this.GererSoutenancesService.getEtudiants().subscribe(
      (data) => {
        this.etudiants = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des étudiants', error);
      }
    );
  }

  chargerEncadrants(): void {
    this.GererSoutenancesService.getEncadrants().subscribe(
      (data) => {
        this.encadrants = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des encadrants', error);
      }
    );
  }

  onSubmit(): void {
    this.GererSoutenancesService.updateSoutenance(this.soutenance).subscribe(
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