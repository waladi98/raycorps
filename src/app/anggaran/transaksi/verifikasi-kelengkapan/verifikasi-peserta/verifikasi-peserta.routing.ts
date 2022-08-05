import { Routes } from '@angular/router';

import { VerifikasiPesertaComponent } from './verifikasi-peserta.component';

export const VerifikasiPesertaRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: VerifikasiPesertaComponent
      },

    ]
  }
];
