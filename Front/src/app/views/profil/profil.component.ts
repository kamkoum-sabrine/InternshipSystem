import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {
  RowComponent, ColComponent, CardComponent, CardHeaderComponent,
  CardBodyComponent, FormControlDirective, FormDirective,
  FormLabelDirective, FormSelectDirective, ButtonDirective
} from '@coreui/angular-pro';
import { IconModule } from '@coreui/icons-angular';
import Swal from 'sweetalert2';
import { GererUtilisateurService } from '../utilisateurs/utilisateurs-basic-example/gerer-utilisateur.service';
import { co } from '@fullcalendar/core/internal-common';

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
  emailExistant: boolean = false;
  phoneExistant: boolean = false;
  faxExistant: boolean = false;
  cinExistant: boolean = false;
  isMastere: boolean = false;
  emailsPhonesFax: any[] = [];

  isEtudiant: boolean = false;

  filiereOptions = ['Informatique', 'GSIL', 'Mecatronique', 'Infotronique'];
  niveauOptions = ['Première', 'Deuxième', 'Troisième'];
  formationOptions = ['Ingénierie', 'Mastère'];
  sexeOptions = ['Masculin', 'Féminin'];

  constructor(
    private fb: FormBuilder,
    private gererUtilisateurService: GererUtilisateurService,
    private router: Router
  ) {
    // Initialiser sans validateurs requis pour les champs académiques
    this.userForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      cin: ['', [Validators.pattern('[0-9]{8}'), Validators.required]],
      sexe: ['', Validators.required],
      dateDeNaissance: ['', Validators.required],
      lieuNaissance: [''],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      tel: ['', [Validators.pattern('[0-9]{8,15}'), Validators.required]],
      adresse: [''],
      fax: ['', [Validators.pattern('[0-9]+')]],
      filiere: [''],
      niveau: [''],
      formation: [''],
      option: ['']
    }, { validators: this.masterValidator });
  }

  ngOnInit(): void {
    this.loadCurrentUser();

    this.gererUtilisateurService.getEmailsPhonesFax().subscribe(
      (emailsPhonesFax: any[]) => {
        // Filtrer les données du current user
        this.emailsPhonesFax = emailsPhonesFax.filter(item => item).filter(item => {
          return item.toLowerCase() !== this.user?.email?.toLowerCase() &&
            item.toLowerCase() !== this.user?.tel?.toLowerCase() &&
            item.toLowerCase() !== this.user?.fax?.toLowerCase() &&
            item.toLowerCase() !== this.user?.cin;

        });
        console.log(this.emailsPhonesFax);
      },
      error => console.error("Erreur lors du chargement des données", error)
    );
  }

  loadCurrentUser(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.user = user;

    if (user.role?.nom === 'ETUDIANT') {
      this.isEtudiant = true;
      // Ajouter les validateurs requis pour les étudiants
      this.setAcademicValidators(true);
    } else {
      this.setAcademicValidators(false);
    }

    this.userForm.patchValue(user);
  }

  private setAcademicValidators(isRequired: boolean): void {
    const academicControls = ['filiere', 'niveau', 'formation', 'option'];

    academicControls.forEach(controlName => {
      const control = this.userForm.get(controlName);
      if (isRequired) {
        control?.setValidators([Validators.required]);
      } else {
        control?.clearValidators();
      }
      control?.updateValueAndValidity();
    });
  }

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

    this.emailExistant = false;
    this.phoneExistant = false;
    this.faxExistant = false;
    this.cinExistant = false;
    this.isMastere = false;

    // Normaliser les valeurs du formulaire
    const formData = {
      email: this.userForm.value.email?.toLowerCase()?.trim() || '',
      tel: this.userForm.value.tel?.toLowerCase()?.trim() || '',
      fax: this.userForm.value.fax?.toLowerCase()?.trim() || '',
      cin: this.userForm.value.cin || ''
    };
    console.log('Form Data:', formData);

    // Normaliser les valeurs du current user
    const currentUser = {
      email: this.user?.email?.toLowerCase()?.trim() || '',
      tel: this.user?.tel?.toLowerCase()?.trim() || '',
      fax: this.user?.fax?.toLowerCase()?.trim() || '',
      cin: this.user?.cin || ''
    };

    // Vérifier les doublons uniquement si différent du current user
    this.emailExistant = formData.email && formData.email !== currentUser.email
      && this.emailsPhonesFax.some(item => item.toLowerCase()?.trim() === formData.email);

    this.phoneExistant = formData.tel && formData.tel !== currentUser.tel
      && this.emailsPhonesFax.some(item => item.toLowerCase()?.trim() === formData.tel);

    this.faxExistant = formData.fax && formData.fax !== currentUser.fax
      && this.emailsPhonesFax.some(item => item.toLowerCase()?.trim() === formData.fax);

    this.cinExistant = formData.cin && formData.cin !== currentUser.cin
      && this.emailsPhonesFax.some(item => item.toLowerCase()?.trim() === formData.cin);





    if (this.emailExistant || this.phoneExistant || this.faxExistant || this.cinExistant) {
      return;
    }





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
    this.emailExistant = false;
    this.phoneExistant = false;
    this.faxExistant = false;
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

  private masterValidator: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {
    const formation = form.get('formation')?.value;
    const niveau = form.get('niveau')?.value;

    if (formation === 'Mastère' && niveau === 'Troisième') {
      return { masterError: true };
    }
    return null;
  };
}