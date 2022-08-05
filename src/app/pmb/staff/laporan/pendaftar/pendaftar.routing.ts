import { Routes } from '@angular/router';

import { PendaftarComponent } from './pendaftar.component';

export const PendaftarRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PendaftarComponent,
      },
    ],
  },
];
