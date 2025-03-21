import { Routes } from '@angular/router';

import { SmartTablesComponent } from './smart-tables.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./smart-tables.component').then(m => m.SmartTablesComponent),
    data: {
      title: 'Smart Table'
    }
  }
];
