import { Routes } from '@angular/router';

import {AttestationsComponent} from './attestations.component' 
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./attestations.component').then(m => m.AttestationsComponent),
    data: {
      title: 'Attestations'
    }
  }
];
