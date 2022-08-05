import { Routes } from '@angular/router';

import { VerifikasiKelulusanPesertaComponent } from './verifikasi-kelulusan-peserta.component';

export const VerifikasiKelulusanPesertaRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: VerifikasiKelulusanPesertaComponent
      },

    ]
  }
];
