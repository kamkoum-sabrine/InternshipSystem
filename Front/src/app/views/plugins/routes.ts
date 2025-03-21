import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Plugins'
    },
    children: [
      {
        path: '',
        redirectTo: 'calendar',
        pathMatch: 'full'
      },
      {
        path: 'calendar',
        loadChildren: () => import('./full-calendar-ng/routes').then((m) => m.routes)
      },
      {
        path: 'charts',
        loadChildren: () => import('./charts/routes').then((m) => m.routes)
      },
      {
        path: 'google-maps',
        loadChildren: () => import('./maps/routes').then((m) => m.routes)
      }
    ]
  }
];
