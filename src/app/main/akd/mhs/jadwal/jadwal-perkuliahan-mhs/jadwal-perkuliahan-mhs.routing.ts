import { Routes } from '@angular/router';

import { JadwalPerkuliahanMhsComponent } from './jadwal-perkuliahan-mhs.component';

export const JadwalPerkuliahanMhsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: JadwalPerkuliahanMhsComponent,
      },
    ],
  },
];
