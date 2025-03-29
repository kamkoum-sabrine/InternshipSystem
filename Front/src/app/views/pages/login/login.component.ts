import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular-pro';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle, FormsModule]
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }
  login() {
    const loginPayload = {
      email: this.email,
      password: this.password,
    };
    console.log("to dash")
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        // Si la connexion est réussie, vous pouvez faire ce que vous voulez avec la réponse
        console.log('Connexion réussie:', response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        window.location.replace('/#/dashboard');
        // Par exemple, rediriger vers une autre page après la connexion
        // this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        // Gérer l'erreur (par exemple, afficher un message d'erreur)
        console.error('Erreur de connexion:', error);
      }
    });
  }
}

