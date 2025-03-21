import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Email'
    },
    children: [
      {
        path: '',
        redirectTo: 'inbox',
        pathMatch: 'full'
      },
      {
        path: 'inbox',
        loadComponent: () => import('./inbox/inbox.component').then(m => m.InboxComponent),
        data: {
          title: 'Inbox'
        }
      },
      {
        path: 'compose',
        loadComponent: () => import('./compose/compose.component').then(m => m.ComposeComponent),
        data: {
          title: 'Compose'
        }
      },
      {
        path: 'inbox/message',
        loadComponent: () => import('./message/message.component').then(m => m.MessageComponent),
        data: {
          title: 'Message'
        }
      },
      {
        path: '**',
        redirectTo: 'inbox'
      }
    ]
  }
];

