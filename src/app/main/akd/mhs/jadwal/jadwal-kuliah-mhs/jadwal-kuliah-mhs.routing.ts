import { Routes } from '@angular/router';

import { JadwalKuliahMhsComponent } from './jadwal-kuliah-mhs.component';

export const JadwalKuliahMhsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: JadwalKuliahMhsComponent,
      },
    ],
  },
];
