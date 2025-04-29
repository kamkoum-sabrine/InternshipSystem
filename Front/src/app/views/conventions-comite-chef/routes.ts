import { Routes } from '@angular/router';
import {ConventionsComiteChefComponent} from './conventions-comite-chef.component';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./conventions-comite-chef.component').then(m => m.ConventionsComiteChefComponent),
    data: {
      title: 'ConventionsComiteChef'
    }
  }
];
