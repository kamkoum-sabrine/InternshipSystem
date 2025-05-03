import { Routes } from '@angular/router';

import {ConventionComiteChefComponent} from './convention-comite-chef.component';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./convention-comite-chef.component').then(m => m.ConventionComiteChefComponent),
    data: {
      title: 'ConventionsComiteChef'
    }
  }
];
