import { Routes } from '@angular/router';

import { InvoiceComponent } from './invoice/invoice.component';

export const routes: Routes = [
  {
    path: 'invoice',
    component: InvoiceComponent,
    data: {
      title: 'Invoice'
    }
  }
];

