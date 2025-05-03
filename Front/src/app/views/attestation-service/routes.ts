import { Routes } from '@angular/router';

import {AttestationServiceComponent} from './attestation-service.component';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./attestation-service.component').then(m => m.AttestationServiceComponent),
    data: {
      title: 'AttestationsService'
    }
  }
];
