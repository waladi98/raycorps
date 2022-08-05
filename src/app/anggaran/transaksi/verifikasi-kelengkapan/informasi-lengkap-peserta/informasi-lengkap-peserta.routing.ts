import { Routes } from '@angular/router';

import { InformasiLengkapPesertaComponent } from './informasi-lengkap-peserta.component';

export const InformasiLengkapPesertaRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: InformasiLengkapPesertaComponent
      },

    ]
  }
];
