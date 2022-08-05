import { Routes } from '@angular/router';

import { LaporanTidakLulusComponent } from './laporan-tidak-lulus.component';

export const LaporanTidakLulusRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LaporanTidakLulusComponent,
      },
    ],
  },
];
