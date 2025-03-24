import { Routes } from '@angular/router';

import { UtilisateursComponent } from './utilisateurs.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./utilisateurs.component').then(m => m.UtilisateursComponent),
    data: {
      title: 'Utilisateurs'
    }
  }
];
