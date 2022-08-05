import { Routes } from '@angular/router';

import { PersetujuanPembimbingComponent } from './persetujuan-pembimbing.component';
import { ManagePersetujuanPembimbingComponent } from './manage-persetujuan-pembimbing/manage-persetujuan-pembimbing.component';

export const PersetujuanPembimbingRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: PersetujuanPembimbingComponent
      },
      {
        path: 'manage-persetujuan-pembimbing/:id',
        data: { recTitle: 'Update Data Persetujuan Pembimbing' },
        component: ManagePersetujuanPembimbingComponent
      },
      {
        path: 'manage-persetujuan-pembimbing',
        data: { recTitle: 'Tambah Data Persetujuan Pembimbing' },
        component: ManagePersetujuanPembimbingComponent
      }
    ]
  }
];
