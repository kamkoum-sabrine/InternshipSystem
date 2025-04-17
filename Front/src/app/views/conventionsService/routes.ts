import { Routes } from '@angular/router';

import { ConventionsServiceComponent } from './conventionsService.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./conventionsService.component').then(m => m.ConventionsServiceComponent),
    data: {
      title: 'ConventionsService'
    }
  }
];
