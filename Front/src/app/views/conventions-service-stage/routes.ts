import { Routes } from '@angular/router';

console.log('[Init] Chargement des routes conventions-service-stage');

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => {
      console.log('[Route] Chargement composant principal conventions-service-stage');
      return import('./conventions-service-stage.component').then(m => {
        console.log('[Route] Composant principal chargé avec succès');
        return m.ConventionsServiceStageComponent;
      }).catch(err => {
        console.error('[Route] Erreur chargement composant principal', err);
        throw err;
      });
    },
    data: { title: 'Conventions Service Stage' }
  },
  {
    path: 'non-annulees',
    loadComponent: () => {
      console.log('[Route] Chargement composant non-annulees');
      return import('./non-annulees-table/non-annulees-table.component').then(m => {
        console.log('[Route] Composant non-annulees chargé avec succès');
        return m.NonAnnuleesTableComponent;
      }).catch(err => {
        console.error('[Route] Erreur chargement composant non-annulees', err);
        throw err;
      });
    },
    data: { title: 'Conventions Non Annulées' }
  }
];