import { Routes } from '@angular/router';

import { JadwalMhsWaliDosenComponent } from './jadwal-mhs-wali-dosen.component';

export const JadwalMhsWaliDosenRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: JadwalMhsWaliDosenComponent,
      },
    ],
  },
];
