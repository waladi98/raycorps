import { Routes } from '@angular/router';

import { CalonPendaftarBatalComponent } from './calon-pendaftar-batal.component';

export const CalonPendaftarBatalRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CalonPendaftarBatalComponent,
      },
    ],
  },
];
