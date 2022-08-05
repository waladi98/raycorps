import { Routes } from '@angular/router';

import { AkdJadwalPraktikumMhsComponent } from './akd-jadwal-praktikum-mhs.component';

export const AkdJadwalPraktikumMhsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AkdJadwalPraktikumMhsComponent,
      },
    ],
  },
];
