import { Routes } from '@angular/router';

import { VerifikatorProdiComponent } from './verifikator-prodi.component';
import { PengecualianGuruComponent } from './pengecualian-guru/pengecualian-guru.component';
import { TambahGuruComponent } from './tambah-guru/tambah-guru.component';
import { UbahGuruComponent } from './ubah-guru/ubah-guru.component';

export const VerifikatorProdiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: VerifikatorProdiComponent,
      },
    ],
  },
];
