import { Component, ViewChild } from '@angular/core';
import { Menu } from 'primeng/menu'; // Importer Menu de PrimeNG
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @ViewChild('menu') menu!: Menu; // Déclarer la référence de template
  menuItems: MenuItem[] = [];

  constructor() {
    this.menuItems = [
      {
        label: 'Manage Profile',
        icon: 'pi pi-user-edit',
        command: () => this.manageProfile()
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      }
    ];
  }

  toggleMenu(event: Event) {
    this.menu.toggle(event);
  }

  manageProfile() {
    console.log('Manage Profile clicked');
    // Ajoutez ici la logique pour gérer le profil
  }

  logout() {
    console.log('Logout clicked');
    // Ajoutez ici la logique pour déconnecter l'utilisateur
  }
}
