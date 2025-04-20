import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {
  RowComponent, ColComponent, CardComponent, CardHeaderComponent,
  CardBodyComponent, FormControlDirective, FormDirective,
  FormLabelDirective, FormSelectDirective, ButtonDirective
} from '@coreui/angular-pro';
import { IconModule } from '@coreui/icons-angular';
import Swal from 'sweetalert2';
import { GererUtilisateurService } from '../utilisateurs/utilisateurs-basic-example/gerer-utilisateur.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RowComponent, ColComponent,
    CardComponent, CardHeaderComponent,
    CardBodyComponent, FormControlDirective,
    FormDirective, FormLabelDirective,
    FormSelectDirective, ButtonDirective,
    IconModule
  ],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class profil {
  userForm: FormGroup;
  user: any;
  emailsExistants: string[] = [];
  emailExistant: boolean = false;

  isEtudiant: boolean = false;

  filiereOptions = ['Informatique', 'GSIL', 'Mecatronique', 'Infotronique'];
  niveauOptions = ['PREMIERE', 'DEUXIEME', 'TROISIEME'];
  formationOptions = ['INGENIERIE', 'MASTERE'];
  sexeOptions = ['HOMME', 'FEMME'];

  constructor(
    private fb: FormBuilder,
    private gererUtilisateurService: GererUtilisateurService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      cin: ['', [Validators.pattern('[0-9]{8}'), Validators.required]],
      sexe: ['', Validators.required],
      dateDeNaissance: ['', Validators.required],
      lieuNaissance: [''],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.pattern('[0-9]{8,15}'), Validators.required]],
      adresse: [''],
      fax: ['', [Validators.pattern('[0-9]+')]],
      filiere: ['', Validators.required],
      niveau: ['', Validators.required],
      formation: ['', Validators.required],
      option: ['']
    });
  }

  ngOnInit(): void {
    this.loadCurrentUser();

    //this.getEmails();
  }

  loadCurrentUser(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.user = user;
    if (user.role.nom === 'ETUDIANT') {
      this.isEtudiant = true;
    }
    this.userForm.patchValue(user);
  }
  /*
    getEmails(): void {
      this.gererUtilisateurService.getUtilisateurs().subscribe(
        (utilisateurs: any[]) => {
          this.emailsExistants = utilisateurs
            .map(u => u.email?.toLowerCase()?.trim())
            .filter(email => !!email && email !== this.user.email);
        },
        error => {
          console.error("Erreur lors du chargement des emails", error);
        }
      );
    }
  */
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('La taille du fichier ne doit pas dépasser 2MB');
        return;
      }
      if (!file.type.match(/image\/(jpeg|png|gif)/)) {
        alert('Seuls les formats JPG, PNG ou GIF sont acceptés');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => this.user.photo = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.markFormGroupTouched(this.userForm);
      return;
    }

    const email = this.userForm.value.email?.toLowerCase().trim();
    if (this.emailsExistants.includes(email)) {
      this.emailExistant = true;
      return;
    }
    this.emailExistant = false;

    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Voulez-vous modifier ces informations',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, Modifier!',
      cancelButtonText: 'Annuler',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedUser = { ...this.user, ...this.userForm.value };
        this.gererUtilisateurService.updateProfile(updatedUser).subscribe(
          (response) => {
            localStorage.setItem('user', JSON.stringify(updatedUser));
            Swal.fire('Succès!', 'Profil mis à jour avec succès', 'success');
            this.loadCurrentUser();
          },
          (error) => {
            Swal.fire('Erreur!', 'Une erreur est survenue', 'error');
          }
        );
      }
    });
  }

  onCancel(): void {
    this.loadCurrentUser();
    this.userForm.reset(this.user);
    Swal.fire('Informations', 'Modifications annulées', 'info');
  }

  deletePhoto(): void {
    this.user.photo = null;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}