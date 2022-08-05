import { Routes } from '@angular/router';

import { PenyetaraanNilaiComponent } from './penyetaraan-nilai.component';
import { ManagePenyetaraanNilaiComponent } from './manage-penyetaraan-nilai/manage-penyetaraan-nilai.component';
import { TambahPenyetaraanNilaiComponent } from './tambah-penyetaraan-nilai/tambah-penyetaraan-nilai.component';

export const PenyetaraanNilaiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PenyetaraanNilaiComponent,
      },
      {
        path: 'manage-penyetaraan-nilai/:id',
        data: { recTitle: 'Update Data PenyetaraanNilai' },
        component: ManagePenyetaraanNilaiComponent,
      },
      {
        path: 'manage-penyetaraan-nilai',
        data: { recTitle: 'Tambah Data PenyetaraanNilai' },
        component: ManagePenyetaraanNilaiComponent,
      },
      {
        path: 'tambah-penyetaraan-nilai',
        component: TambahPenyetaraanNilaiComponent,
      },
    ],
  },
];
