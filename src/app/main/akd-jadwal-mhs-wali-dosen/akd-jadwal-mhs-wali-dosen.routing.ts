import { Routes } from '@angular/router';

import { AkdJadwalMhsWaliDosenComponent } from './akd-jadwal-mhs-wali-dosen.component';

export const AkdJadwalMhsWaliDosenRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AkdJadwalMhsWaliDosenComponent,
      },
    ],
  },
];
