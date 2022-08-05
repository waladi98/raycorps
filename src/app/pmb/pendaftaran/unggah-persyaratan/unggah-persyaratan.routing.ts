import { Routes } from '@angular/router';
import { UbahUnggahPersyaratanComponent } from './ubah-persyaratan/ubah-unggah-persyaratan.component';

import { UnggahPersyaratanComponent } from './unggah-persyaratan.component';

export const UnggahPersyaratanRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: UnggahPersyaratanComponent
      },
      {
        path: 'ubah',
        component: UbahUnggahPersyaratanComponent
      }
    ]
  }
];
