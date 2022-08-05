import { Routes } from '@angular/router';

import { AsalSekolahPesertaComponent } from './asal-sekolah-peserta.component';

export const AsalSekolahPesertaRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AsalSekolahPesertaComponent,
      },
    ],
  },
];
