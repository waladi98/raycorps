import { Routes } from '@angular/router';

import { VerifikasiKegiatanSK3Component } from './verifikasi-kegiatan-sk3.component';
import { MenuVerifikasiKegiatanSK3Component } from './verifikasi-kegiatan-sk3/verifikasi-kegiatan-sk3.component';

export const VerifikasiKegiatanSK3Routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: VerifikasiKegiatanSK3Component,
      },
      {
        path: 'verifikasi',
        component: MenuVerifikasiKegiatanSK3Component,
      },
    ],
  },
];
