import { Routes } from '@angular/router';

import { FullCalendarNgComponent } from './full-calendar-ng.component';

export const routes: Routes = [
  {
    path: '',
    component: FullCalendarNgComponent,
    data: {
      title: 'FullCalendar'
    }
  }
];
