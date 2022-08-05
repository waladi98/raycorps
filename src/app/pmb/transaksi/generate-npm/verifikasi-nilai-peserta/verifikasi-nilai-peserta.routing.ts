import { Routes } from '@angular/router';

import { VerifikasiNilaiPesertaComponent } from './verifikasi-nilai-peserta.component';

export const VerifikasiNilaiPesertaRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: VerifikasiNilaiPesertaComponent
      },

    ]
  }
];
