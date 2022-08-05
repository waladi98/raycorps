import { Routes } from '@angular/router';

import { JadwalPraktikumMhsComponent } from './jadwal-praktikum-mhs.component';

export const JadwalPraktikumMhsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: JadwalPraktikumMhsComponent,
      },
    ],
  },
];
