import { provideHttpClient, withJsonpSupport } from '@angular/common/http';
import { Routes } from '@angular/router';

import { GoogleMapsComponent } from './google-maps.component';

export const routes: Routes = [
  {
    path: '',
    component: GoogleMapsComponent,
    data: {
      title: 'Google Maps'
    },
    providers: [
      provideHttpClient(withJsonpSupport()),
    ]
  }
];
