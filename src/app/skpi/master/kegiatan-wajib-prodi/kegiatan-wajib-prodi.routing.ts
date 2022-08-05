import { Routes } from '@angular/router';

import { KegiatanWajibProdiComponent } from './kegiatan-wajib-prodi.component';

export const KegiatanSK3ProdiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: KegiatanWajibProdiComponent,
      },
    ],
  },
];
