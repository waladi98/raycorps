import { Routes } from '@angular/router';

import { JenisKegiatanComponent } from './jenis-kegiatan.component';

export const JenisKegiatanRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: JenisKegiatanComponent,
      },
    ],
  },
];
