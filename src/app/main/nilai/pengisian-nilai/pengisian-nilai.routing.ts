import { Routes } from '@angular/router';

import { PengisianNilaiComponent } from './pengisian-nilai.component';
import { ManagePengisianNilaiComponent } from './manage-pengisian-nilai/manage-pengisian-nilai.component';

export const PengisianNilaiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PengisianNilaiComponent,
      },
      {
        path: 'manage-pengisian-nilai/:id',
        data: { recTitle: 'Update Data PengisianNilai' },
        component: ManagePengisianNilaiComponent,
      },
      {
        path: 'manage-pengisian-nilai',
        data: { recTitle: 'Tambah Data PengisianNilai' },
        component: ManagePengisianNilaiComponent,
      },
    ],
  },
];
