import { Routes } from '@angular/router';

import { RiwayatNilaiComponent } from './riwayat-nilai.component';
import { ManageRiwayatNilaiComponent } from './manage-riwayat-nilai/manage-riwayat-nilai.component';

export const RiwayatNilaiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: RiwayatNilaiComponent,
      },
      {
        path: 'manage-riwayat-nilai/:id',
        data: { recTitle: 'Update Data RiwayatNilai' },
        component: ManageRiwayatNilaiComponent,
      },
      {
        path: 'manage-riwayat-nilai',
        data: { recTitle: 'Tambah Data RiwayatNilai' },
        component: ManageRiwayatNilaiComponent,
      },
    ],
  },
];
