import { Routes } from '@angular/router';

import { VerifikasiKegiatanSK3Component } from './verifikasi-kegiatan-sk3.component';

export const VerifikasiKegiatanSK3Routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: VerifikasiKegiatanSK3Component,
      },
    ],
  },
];
