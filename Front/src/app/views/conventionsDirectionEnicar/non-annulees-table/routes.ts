// src/app/views/conventions-service-stage/non-annulees/routes.ts
import { Routes } from '@angular/router';
import { NonAnnuleesTableComponent } from './non-annulees-table.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./non-annulees-table.component').then(m => m.NonAnnuleesTableComponent),
    data: {
      title: 'Conventions Non Annulées'
    }
  }
];