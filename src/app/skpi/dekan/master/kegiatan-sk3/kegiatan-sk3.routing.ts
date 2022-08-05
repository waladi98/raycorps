import { Routes } from '@angular/router';

import { KegiatanSK3Component } from './kegiatan-sk3.component';

export const KegiatanSK3Routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: KegiatanSK3Component,
      },
    ],
  },
];
