import { Routes } from '@angular/router';

import { ConventionsDirectionEnicarComponent } from './conventionsDirectionEnicar.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./conventionsDirectionEnicar.component').then(m => m.ConventionsDirectionEnicarComponent),
    data: {
      title: 'ConventionsDirectionEnicar'
    }
  }
];
