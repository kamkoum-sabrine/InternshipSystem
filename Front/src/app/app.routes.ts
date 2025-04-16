import { Routes } from '@angular/router';
import { DefaultLayoutComponent, EmailLayoutComponent } from './layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'apps/email',
    component: EmailLayoutComponent,

    children: [
      {
        path: '',
        loadChildren: () => import('./views/apps/email/routes').then((m) => m.routes)
      }
    ]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/routes').then((m) => m.routes)
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/routes').then((m) => m.routes)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/routes').then((m) => m.routes)
      },
      {
        path: 'forms',
        loadChildren: () => import('./views/forms/routes').then((m) => m.routes)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/routes').then((m) => m.routes)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/routes').then((m) => m.routes)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/routes').then((m) => m.routes)
      },
      {
        path: 'utilisateurs',
        loadChildren: () => import('./views/utilisateurs/routes').then((m) => m.routes)
      },
      {
        path: 'entreprises',
        loadChildren: () => import('./views/entreprises/routes').then((m) => m.routes)
      },
      {
        path: 'soutenances',
        loadChildren: () => import('./views/soutenances/routes').then((m) => m.routes)
      },
      {
        path: 'enseignants',
        loadChildren: () => import('./views/enseignant/routes').then((m) => m.routes)
      },
      {
        path: 'conventionsEtudiant',
        loadChildren: () => import('./views/conventionsEtudiants/routes').then((m) => m.routes)
      },
      {
        path: 'conventionsService',
        loadChildren: () => import('./views/conventionsService/routes').then((m) => m.routes)

        /*  loadChildren: () => {
            console.log('[Route] Chargement des routes conventionsService');
            return import('./views/conventions-service-stage/routes').then((m) => {
              console.log('[Route] Routes conventionsService chargées avec succès');
              return m.routes;
            }).catch(err => {
              console.error('[Route] Erreur chargement routes conventionsService', err);
              throw err;
            });
          }*/
      },
      {
        path: 'profile',
        loadChildren: () => import('./views/profil/routes').then(m => m.routes)
      },
      {
        path: 'plugins',
        loadChildren: () => import('./views/plugins/routes').then((m) => m.routes)
      },
      {
        path: 'pages',
        loadChildren: () => import('./views/pages/routes').then((m) => m.routes)
      },
      {
        path: 'apps',
        loadChildren: () => import('./views/apps/routes').then((m) => m.routes)
      }
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];
