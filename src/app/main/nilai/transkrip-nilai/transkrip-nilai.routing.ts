import { Routes } from '@angular/router';

import { TranskripNilaiComponent } from './transkrip-nilai.component';
import { ManageTranskripNilaiComponent } from './manage-transkrip-nilai/manage-transkrip-nilai.component';

export const TranskripNilaiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TranskripNilaiComponent,
      },
      {
        path: 'manage-transkrip-nilai/:id',
        data: { recTitle: 'Update Data TranskripNilai' },
        component: ManageTranskripNilaiComponent,
      },
      {
        path: 'manage-transkrip-nilai',
        data: { recTitle: 'Tambah Data TranskripNilai' },
        component: ManageTranskripNilaiComponent,
      },
    ],
  },
];
