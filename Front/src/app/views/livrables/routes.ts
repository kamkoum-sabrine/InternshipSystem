import { Routes } from '@angular/router';

import { LivrablesComponent } from './livrables.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./livrables.component').then(m => m.LivrablesComponent),
    data: {
      title: 'Livrables'
    }
  }
];
