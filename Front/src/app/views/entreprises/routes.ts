import { Routes } from '@angular/router';

import { EntreprisesComponent } from './entreprises.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./entreprises.component').then(m => m.EntreprisesComponent),
    data: {
      title: 'Entreprises'
    }
  }
];
