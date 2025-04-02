import { Routes } from '@angular/router';

import { ConventionsEtudiantComponent } from './conventionsEtudiant.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./conventionsEtudiant.component').then(m => m.ConventionsEtudiantComponent),
    data: {
      title: 'ConventionsEtudiant'
    }
  }
];
