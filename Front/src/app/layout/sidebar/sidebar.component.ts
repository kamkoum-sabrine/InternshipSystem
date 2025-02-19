import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  items: MenuItem[] = [];

  constructor() {
    this.items = this.createMenuItems();
  }

  // Fonction pour créer les éléments du menu
  createMenuItems(): MenuItem[] {
    return [
      {
        label: 'Fichier',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'Nouveau',
            icon: 'pi pi-fw pi-plus',
            items: [
              { label: 'Projet', icon: 'pi pi-fw pi-folder' },
              { label: 'Document', icon: 'pi pi-fw pi-file' }
            ]
          },
          { label: 'Ouvrir', icon: 'pi pi-fw pi-folder-open' },
          { separator: true },
          { label: 'Quitter', icon: 'pi pi-fw pi-power-off' }
        ]
      },
      {
        label: 'Édition',
        icon: 'pi pi-fw pi-pencil',
        items: [
          { label: 'Annuler', icon: 'pi pi-fw pi-undo' },
          { label: 'Refaire', icon: 'pi pi-fw pi-redo' }
        ]
      },
      {
        label: 'Aide',
        icon: 'pi pi-fw pi-question',
        items: [
          { label: 'Documentation', icon: 'pi pi-fw pi-book' },
          { label: 'Support', icon: 'pi pi-fw pi-info-circle' }
        ]
      }
    ];
  }

  // Fonction pour basculer l'état de tous les éléments
  toggleAll() {
    this.items.forEach(item => this.toggleItem(item));
  }

  // Fonction récursive pour basculer l'état d'un élément et de ses enfants
  toggleItem(item: MenuItem) {
    if (item.items) {
      item.expanded = !item.expanded; // Basculer l'état développé/replié
      item.items.forEach(child => this.toggleItem(child)); // Appliquer récursivement aux enfants
    }
  }


}
