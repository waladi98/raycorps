import { Routes } from '@angular/router';

import { CalonPendaftarComponent } from './calon-pendaftar.component';

export const CalonPendaftarRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CalonPendaftarComponent,
      },
    ],
  },
];
