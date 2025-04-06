import { Routes } from '@angular/router';

import { profil } from './profil.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./profil.component').then(m => m.profil),
    data: {
      title: 'Profil'
    }
  }
];
