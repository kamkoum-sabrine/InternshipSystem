import { Routes } from '@angular/router';

import { EnseignantComponent } from './enseignant.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./enseignant.component').then(m => m.EnseignantComponent),
    data: {
      title: 'enseignants'
    }
  }
];
