import { Routes } from '@angular/router';

import { VerifikasiUsulanSKPIComponent } from './verifikasi-usulan-skpi.component';

export const VerifikasiUsulanSKPIRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: VerifikasiUsulanSKPIComponent,
      },
    ],
  },
];
