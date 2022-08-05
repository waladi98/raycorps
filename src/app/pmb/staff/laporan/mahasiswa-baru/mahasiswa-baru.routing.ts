import { Routes } from '@angular/router';

import { MahasiswaBaruComponent } from './mahasiswa-baru.component';

export const MahasiswaBaruRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MahasiswaBaruComponent,
      },
    ],
  },
];
