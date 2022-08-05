import { Routes } from '@angular/router';

import { EditTranskripNilaiComponent } from './edit-transkrip-nilai.component';
import { ManageEditTranskripNilaiComponent } from './manage-edit-transkrip-nilai/manage-edit-transkrip-nilai.component';

export const EditTranskripNilaiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: EditTranskripNilaiComponent,
      },
      {
        path: 'manage-edit-transkrip-nilai/:id',
        data: { recTitle: 'Update Data EditTranskripNilai' },
        component: ManageEditTranskripNilaiComponent,
      },
      {
        path: 'manage-edit-transkrip-nilai',
        data: { recTitle: 'Tambah Data EditTranskripNilai' },
        component: ManageEditTranskripNilaiComponent,
      },
    ],
  },
];
