import { Routes } from '@angular/router';
import { UbahUnggahKelengkapanComponent } from './ubah-kelengkapan/ubah-unggah-kelengkapan.component';
import { UnggahKelengkapanComponent } from './unggah-kelengkapan.component';

export const UnggahKelengkapanRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: UnggahKelengkapanComponent
      },
      {
        path: 'ubah',
        component: UbahUnggahKelengkapanComponent
      }
    ]
  }
];
