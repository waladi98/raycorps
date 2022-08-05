import { Routes } from '@angular/router';

import { KegiatanSK3ProdiComponent } from './kegiatan-sk3-prodi.component';

export const KegiatanSK3ProdiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: KegiatanSK3ProdiComponent,
      },
    ],
  },
];
