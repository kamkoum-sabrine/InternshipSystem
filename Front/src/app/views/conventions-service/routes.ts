import { Routes } from '@angular/router';

import{ConventionsServiceComponent} from './conventions-service.component';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./conventions-service.component').then(m => m.ConventionsServiceComponent),
    data: {
      title: 'ConventionsService'
    }
  }
];
