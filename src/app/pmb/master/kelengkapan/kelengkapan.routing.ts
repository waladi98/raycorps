import { Routes } from '@angular/router';

import { KelengkapanComponent } from './kelengkapan.component';
import { PengecualianKelengkapanComponent } from './pengecualian-kelengkapan/pengecualian-kelengkapan.component';
import { TambahKelengkapanComponent } from './tambah-kelengkapan/tambah-kelengkapan.component';
import { UbahKelengkapanComponent } from './ubah-kelengkapan/ubah-kelengkapan.component';

export const KelengkapanRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: KelengkapanComponent,
      },
      {
        path: 'tambah-kelengkapan',
        component: TambahKelengkapanComponent,
      },
      {
        path: 'ubah-kelengkapan',
        component: UbahKelengkapanComponent,
      },
      {
        path: 'pengecualian-kelengkapan',
        component: PengecualianKelengkapanComponent,
      },
    ],
  },
];
