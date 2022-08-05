import { Routes } from '@angular/router';

import { RekapitulasiPMBComponent } from './rekapitulasi-pmb.component';

export const CalonPendaftarRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: RekapitulasiPMBComponent,
      },
    ],
  },
];
