import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular-pro';
import { AuthService } from './auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    '[style.background-image]': '"url(../../../../assets/images/bg1.jpg)"',
    '[style.background-size]': '"cover"',
    '[style.display]': '"flex"',
    '[style.justify-content]': '"center"',
    '[style.align-items]': '"center"',
    '[style.min-height]': '"100vh"'
  },
  standalone: true,
  imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle, FormsModule, ReactiveFormsModule]
})
export class LoginComponent {
  isLoading: boolean | undefined;
  errorMessage(errorMessage: any) {
    throw new Error('Method not implemented.');
  }


  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, @Inject(PLATFORM_ID) private platformId: any) { }


  login() {

    const loginPayload = {
      email: this.email,
      password: this.password,
    };
    console.log("to dash")
    console.log("email " + this.email)
    console.log("password " + this.password)
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Connexion réussie:', response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        // window.location.replace('/#/dashboard');
        if (isPlatformBrowser(this.platformId)) {
          this.router.navigate(['/dashboard']);
        }
        // this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        // Gérer l'erreur (par exemple, afficher un message d'erreur)
        console.error('Erreur de connexion:', error);
        Swal.fire({
          title: 'Erreur',
          text: 'Mot de passe ou email invalide',
          icon: 'error',
          showConfirmButton: true,  // Affiche uniquement le bouton de confirmation
          confirmButtonText: 'OK',
          timer: 3000, // Ferme automatiquement l'alerte après 3 secondes (facultatif)
          timerProgressBar: true
        });
      }
    });
  }
}

