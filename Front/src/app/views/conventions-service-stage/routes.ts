import { Routes } from '@angular/router';

import {ConventionsServiceStageComponent} from './conventions-service-stage.component';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./conventions-service-stage.component').then(m => m.ConventionsServiceStageComponent),
    data: {
      title: 'ConventionsServiceStage'
    }
  }
];
