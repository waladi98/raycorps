import { Routes } from '@angular/router';

import { AkdJadwalPerkuliahanMhsComponent } from './akd-jadwal-perkuliahan-mhs.component';

export const AkdJadwalPerkuliahanMhsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AkdJadwalPerkuliahanMhsComponent,
      },
    ],
  },
];
