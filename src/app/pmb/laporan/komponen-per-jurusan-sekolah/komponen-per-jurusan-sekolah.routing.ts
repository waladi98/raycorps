import { Routes } from '@angular/router';

import { KomponenPerJurusanSekolahComponent } from './komponen-per-jurusan-sekolah.component';

export const KomponenPerJurusanSekolahRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: KomponenPerJurusanSekolahComponent,
      },
    ],
  },
];
