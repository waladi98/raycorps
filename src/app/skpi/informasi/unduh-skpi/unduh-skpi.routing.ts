import { Routes } from '@angular/router';

import { UnduhSKPIComponent } from './unduh-skpi.component';

export const UnduhSKPIRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UnduhSKPIComponent,
      },
    ],
  },
];
