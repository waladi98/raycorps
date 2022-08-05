import { Routes } from '@angular/router';

import { DaftarPesertaPMBComponent } from './daftar-peserta-pmb.component';

export const DaftarPesertaPMBRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: DaftarPesertaPMBComponent
      },

    ]
  }
];
