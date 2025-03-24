import { Routes } from '@angular/router';

import { SoutenancesComponent } from './soutenances.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./soutenances.component').then(m => m.SoutenancesComponent),
    data: {
      title: 'Soutenances'
    }
  }
];
