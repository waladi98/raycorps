import { Routes } from '@angular/router';

import { KartuKemajuanStudiComponent } from './kartu-kemajuan-studi.component';
import { ManageKartuKemajuanStudiComponent } from './manage-kartu-kemajuan-studi/manage-kartu-kemajuan-studi.component';

export const KartuKemajuanStudiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: KartuKemajuanStudiComponent,
      },
      {
        path: 'manage-kartu-kemajuan-studi/:id',
        data: { recTitle: 'Update Data KartuKemajuanStudi' },
        component: ManageKartuKemajuanStudiComponent,
      },
      {
        path: 'manage-kartu-kemajuan-studi',
        data: { recTitle: 'Tambah Data KartuKemajuanStudi' },
        component: ManageKartuKemajuanStudiComponent,
      },
    ],
  },
];
