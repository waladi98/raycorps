import { Routes } from '@angular/router';

import { JadwalMengajarComponent } from './jadwal-mengajar.component';

export const JadwalMengajarRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: JadwalMengajarComponent,
      },
    ],
  },
];
