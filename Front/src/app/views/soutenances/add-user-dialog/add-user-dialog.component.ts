import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  RowComponent, ColComponent, TextColorDirective, CardComponent,
  CardHeaderComponent, CardBodyComponent, FormControlDirective,
  FormDirective, FormLabelDirective, FormSelectDirective, FormCheckComponent,
  FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ColDirective,
  InputGroupComponent, InputGroupTextDirective,
  MultiSelectComponent as MultiSelectComponent_1,
  MultiSelectOptionComponent, MultiSelectOptgroupComponent
} from '@coreui/angular-pro';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { GererSoutenancesService } from '../soutenances-basic-example/gerer-soutenances.service';
import { SoutenancesServiceService } from '../soutenances-service.service';

@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RowComponent, ColComponent, TextColorDirective, CardComponent,
    CardHeaderComponent, CardBodyComponent, FormControlDirective, FormDirective,
    FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective,
    FormCheckLabelDirective, ButtonDirective, ColDirective, InputGroupComponent,
    InputGroupTextDirective, MultiSelectComponent_1, MultiSelectOptionComponent, MultiSelectOptgroupComponent
  ],
  templateUrl: './add-user-dialog.component.html',
})
export class AddUserDialogComponent implements OnInit {

  errorMessage: string | null = null;
  etudiants: any[] = [];
  encadrants: any[] = [];
  jurys: any[] = [];
  soutenancesExistantes: any[] = [];

  soutenance = {
    date: '',
    heure: '',
    salle: '',
    etudiantId: '',
    encadrantId: '',
    juryIds: [] as (number | null)[], // tableau de juryIds qui peut être un nombre ou null
    sujet: ''
  };

  constructor(
    private gererSoutenancesService: GererSoutenancesService,
    private soutenancesService: SoutenancesServiceService,
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.gererSoutenancesService.getEtudiants().subscribe(data => this.etudiants = data);
    this.gererSoutenancesService.getEncadrants().subscribe(data => this.encadrants = data);
    this.jurys = this.encadrants
    this.soutenancesService.getSoutenances().subscribe(data => {
      this.soutenancesExistantes = data;

      console.log(this.soutenancesExistantes);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  normalizeTime(time: string): string {
    return time.slice(0, 5); // Ex: "10:30:00" → "10:30"
  }

  onSubmit(): void {
    console.log('Soutenance à ajouter :', this.soutenance);

    const conflit = this.soutenancesExistantes.find(existing => {
      const existingHeure = existing.heure ? existing.heure.substring(0, 5) : '';
      const newHeure = this.soutenance.heure ? this.soutenance.heure.substring(0, 5) : '';

      const juryConflit = existing.jury?.some((jury: { id: number }) =>
        this.soutenance.juryIds.includes(jury.id)
      );

      return existing.date === this.soutenance.date &&
        existingHeure === newHeure &&
        (
          existing.salle?.toString() === this.soutenance.salle?.toString() ||
          Number(existing.encadrant?.id) === Number(this.soutenance.encadrantId) ||
          Number(existing.etudiant?.id) === Number(this.soutenance.etudiantId) ||
          juryConflit
        );
    });

    console.log('Conflit détecté :', conflit);

    if (conflit) {
      let details: string[] = [];

      if (conflit.salle?.toString() === this.soutenance.salle?.toString()) {
        details.push(`la salle "${conflit.salle}" est déjà réservée`);
      }

      if (conflit.encadrant?.id === Number(this.soutenance.encadrantId)) {
        details.push(`l'encadrant "${conflit.encadrant.nom} ${conflit.encadrant.prenom}" est déjà pris`);
      }

      if (conflit.etudiant?.id === Number(this.soutenance.etudiantId)) {
        details.push(`l'étudiant "${conflit.etudiant.nom} ${conflit.etudiant.prenom}" est déjà planifié`);
      }

      const jurysEnConflit = conflit.jury?.filter((jury: { id: number }) =>
        this.soutenance.juryIds.includes(jury.id)
      );

      if (jurysEnConflit && jurysEnConflit.length > 0) {
        const jurysDetails = jurysEnConflit.map((j: { nom: string, prenom: string }) => `${j.nom} ${j.prenom}`);
        details.push(`les jurys suivants sont déjà affectés : ${jurysDetails.join(', ')}`);
      }

      this.errorMessage = `Erreur de planification :<br>
  Une soutenance est déjà prévue le ${conflit.date} à ${this.normalizeTime(conflit.heure)} avec :<br><br>
  ${details.map(d => `• ${d}`).join('<br>')}`;

      return;
    }

    this.gererSoutenancesService.addSoutenance(this.soutenance).subscribe({
      next: () => {
        this.dialogRef.close(this.soutenance);
        window.location.reload();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = "Erreur lors de l’enregistrement de la soutenance.";
      }
    });
  }


  addJury() {
    this.soutenance.juryIds.push(null); // Ajouter un jury vide
  }

  removeJury(index: number) {
    this.soutenance.juryIds.splice(index, 1); // Supprimer un jury
  }
}
