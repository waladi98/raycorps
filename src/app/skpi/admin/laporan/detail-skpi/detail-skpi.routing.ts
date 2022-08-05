import { Routes } from '@angular/router';

import { DetailSKPIComponent } from './detail-skpi.component';

export const DetailSKPIRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DetailSKPIComponent,
      },
    ],
  },
];
