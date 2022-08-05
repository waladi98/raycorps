import { Routes } from '@angular/router';

import { StaffVerifikasiComponent } from './staff-verifikasi.component';

export const StaffVerifikasiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: StaffVerifikasiComponent,
      },
    ],
  },
];
