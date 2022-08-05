import { Routes } from '@angular/router';

import { LaporanUndurDiriComponent } from './laporan-undur-diri.component';

export const LaporanUndurDiriRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LaporanUndurDiriComponent,
      },
    ],
  },
];
