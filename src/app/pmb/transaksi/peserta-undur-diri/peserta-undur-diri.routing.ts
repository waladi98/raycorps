import { Routes } from '@angular/router';
import { UbahUnggahKelengkapanComponent } from './ubah-kelengkapan/ubah-unggah-kelengkapan.component';
import { PesertaUndurDiriComponent } from './peserta-undur-diri.component';

export const PesertaUndurDiriRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: PesertaUndurDiriComponent
      },
      {
        path: 'ubah',
        component: UbahUnggahKelengkapanComponent
      }
    ]
  }
];
