import { Routes } from '@angular/router';

import { PengajuanSKSComponent } from './pengajuan-0-sks.component';
import { ManagePengajuanSKSComponent } from './manage-pengajuan-0-sks/manage-pengajuan-0-sks.component';

export const PengajuanSKSRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: PengajuanSKSComponent
      },
      {
        path: 'manage-pengajuan-0-sks/:id',
        data: { recTitle: 'Update Data Pengajuan 0 SKS' },
        component: ManagePengajuanSKSComponent
      },
      {
        path: 'manage-pengajuan-0-sks',
        data: { recTitle: 'Tambah Data Pengajuan 0 SKS' },
        component: ManagePengajuanSKSComponent
      }
    ]
  }
];
