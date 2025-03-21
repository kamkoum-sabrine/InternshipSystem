import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Apps'
    },
    children: [
      {
        path: 'email',
        loadChildren: () => import('./email/routes').then(m => m.routes)
      },
      {
        path: 'invoicing',
        loadChildren: () => import('./invoice/routes').then((m) => m.routes)
      }
    ]
  }
];
