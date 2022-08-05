import { Routes } from '@angular/router';

import { RiwayatNilaiComponent } from './riwayat-nilai.component';

export const RiwayatNilaiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: RiwayatNilaiComponent,
      },
    ],
  },
];
