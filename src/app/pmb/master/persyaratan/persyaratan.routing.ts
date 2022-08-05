import { Routes } from '@angular/router';

import { PersyaratanComponent } from './persyaratan.component';
import { PengecualianPersyaratanComponent } from './pengecualian-persyaratan/pengecualian-persyaratan.component';
import { TambahPersyaratanComponent } from './tambah-persyaratan/tambah-persyaratan.component';
import { UbahPersyaratanComponent } from './ubah-persyaratan/ubah-persyaratan.component';

export const PersyaratanRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PersyaratanComponent,
      },
      {
        path: 'tambah-persyaratan',
        component: TambahPersyaratanComponent,
      },
      {
        path: 'ubah-persyaratan',
        component: UbahPersyaratanComponent,
      },
      {
        path: 'pengecualian-persyaratan',
        component: PengecualianPersyaratanComponent,
      },
    ],
  },
];
