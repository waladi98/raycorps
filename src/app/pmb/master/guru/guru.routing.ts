import { Routes } from '@angular/router';

import { GuruComponent } from './guru.component';
import { PengecualianGuruComponent } from './pengecualian-guru/pengecualian-guru.component';
import { TambahGuruComponent } from './tambah-guru/tambah-guru.component';
import { UbahGuruComponent } from './ubah-guru/ubah-guru.component';

export const SekolahRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: GuruComponent,
      },
      {
        path: 'tambah-guru',
        component: TambahGuruComponent,
      },
      {
        path: 'ubah-guru/:id',
        component: UbahGuruComponent,
      },
      {
        path: 'pengecualian-guru',
        component: PengecualianGuruComponent,
      },
    ],
  },
];
