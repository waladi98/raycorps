import { Routes } from '@angular/router';

import { KeuanganComponent } from './keuangan.component';

export const KeuanganRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: KeuanganComponent,
      },
    ],
  },
];
