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
import { SoutenancesServiceService } from '../soutenances-service.service';
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
  soutenance: any = {

  };
  etudiants: any[] = [];
  encadrants: any[] = [];
  jurySelectionnes: any[] = [];
  juryMember: any[] = [];// Stocker les IDs des membres du jury sélectionnés
  soutenancesExistantes: any[] = [];// tableau de soutenances existantes
  errorMessage: string | null = null;
  constructor(
    public dialogRef: MatDialogRef<UpdateSoutenanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { soutenanceId: number },
    private GererSoutenancesService: GererSoutenancesService,
    private soutenancesService: SoutenancesServiceService,
  ) {

  }

  ngOnInit(): void {
    this.chargerEtudiants();
    this.chargerEncadrants();
    this.chargerSoutenance();
    this.soutenancesService.getSoutenances().subscribe(data => {
      this.soutenancesExistantes = data;
      console.log(this.soutenancesExistantes);
    });
    this.elimininerSoutenanceParId(this.soutenance);



  }

  elimininerSoutenanceParId(id: number): void {
    this.soutenancesExistantes = this.soutenancesExistantes.filter(soutenance => soutenance.id !== id);
  }

  getJuryIds(): void {
    for (let jury of this.jurySelectionnes) {
      this.juryMember.push(jury.id);
    }
    console.log(this.juryMember);
  }

  chargerSoutenance(): void {
    this.GererSoutenancesService.getSoutenanceById(this.data.soutenanceId).subscribe(
      (data) => {
        this.soutenance = data;
        this.jurySelectionnes = data.jury;
        console.log(this.jurySelectionnes);
        for (let juryid of this.jurySelectionnes) {
          this.juryMember.push(juryid.id);
        }
        console.log(this.juryMember);


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
    console.log('Soutenance à ajouter :', this.soutenance);

    const conflit = this.soutenancesExistantes.find(existing => {
      const existingHeure = existing.heure ? existing.heure.substring(0, 5) : '';
      const newHeure = this.soutenance.heure ? this.soutenance.heure.substring(0, 5) : '';

      // Vérifie si l'ID du jury de la soutenance existe déjà dans la soutenance existante
      const juryConflit = existing.jury?.some((jury: { id: number }) =>
        this.soutenance.jury?.some((jurySoutenance: { id: number }) => jurySoutenance.id === jury.id)
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

      // Vérification des jurys en conflit
      const jurysEnConflit = conflit.jury?.filter((jury: { id: number }) =>
        this.juryMember.includes(jury.id) // Utilisation correcte de juryMember
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

    // Si aucun conflit n'est trouvé, mettre à jour la soutenance
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

  normalizeTime(time: string): string {
    return time.slice(0, 5); // Ex: "10:30:00" → "10:30"
  }

}