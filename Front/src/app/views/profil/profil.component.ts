import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
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
    FormsModule,
    RowComponent, ColComponent,
    CardComponent, CardHeaderComponent,
    CardBodyComponent, FormControlDirective,
    FormDirective, FormLabelDirective,
    FormSelectDirective, ButtonDirective,
    IconModule,
  ],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class profil {
  userForm: FormGroup;
  user: any;

  // Options pour les selects
  filiereOptions = ['Informatique', 'GSIL', 'Mecatronique', 'Infotronique'];
  niveauOptions = ['PREMIERE', 'DEUXIEME', 'TROISIEME'];
  formationOptions = ['INGENIERIE', 'MASTERE'];
  sexeoptions = ['HOMME', 'FEMME'];

  constructor(private fb: FormBuilder, private GererUtilisateurService: GererUtilisateurService, private router: Router) {
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
      fax: ['', Validators.pattern('[0-9]+')],
      filiere: ['', Validators.required],
      niveau: ['', Validators.required],
      formation: ['', Validators.required],
      option: ['']
    });
  }
  ngOnInit(): void {
    this.loadCurrentUser();
  }
  loadCurrentUser(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.user = user
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validation
      if (file.size > 2 * 1024 * 1024) {
        alert('La taille du fichier ne doit pas dépasser 2MB');
        return;
      }
      if (!file.type.match(/image\/(jpeg|png|gif)/)) {
        alert('Seuls les formats JPG, PNG ou GIF sont acceptés');
        return;
      }

      // Prévisualisation
      const reader = new FileReader();
      reader.onload = () => this.user.photo = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {


      Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Voulez vous modifier ces informations',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, Modifier!',
        cancelButtonText: 'Annuler',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          // L'événement est confirmé
          console.log(this.user)
          this.GererUtilisateurService.updateProfile(this.user).subscribe(
            (response) => {
              console.log('Donnees modifiée avec succès', response);
              localStorage.setItem('user', JSON.stringify(this.user));
              window.location.reload();
            },
            (error) => {
              console.error('Erreur lors de la modification', error);
            }
          );
          // Ajouter la logique de confirmation ici
        } else if (result.isDismissed) {
          // L'événement est annulé
          Swal.fire('Événement annulé', '', 'info');
        }
      });
      // Ici vous ajouteriez l'appel à votre service
      // this.userService.updateUser(this.user).subscribe(...)
    } else {
      console.log("Le formulaire est invalide");
    }
  }

  onCancel(): void {
    // Logique d'annulation
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Voulez vous annuler ces modifications',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, annuler!',
      cancelButtonText: 'quiter sans annuler',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // L'événement est confirmé
        this.loadCurrentUser();
        console.log('Modifications annulées');
        // Ajouter la logique de confirmation ici
      } else if (result.isDismissed) {
        // L'événement est annulé
        Swal.fire('Événement annulé', '', 'info');
      }
    });
  }

}

