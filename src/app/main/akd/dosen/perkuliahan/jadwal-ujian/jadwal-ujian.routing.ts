import { Routes } from '@angular/router';

import { JadwalUjianComponent } from './jadwal-ujian.component';

export const JadwalUjianRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: JadwalUjianComponent,
      },
    ],
  },
];
