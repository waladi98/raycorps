import { Routes } from '@angular/router';

import { SebaranKemajuanStudiComponent } from './sebaran-kemajuan-studi.component';
import { ManageSebaranKemajuanStudiComponent } from './manage-sebaran-kemajuan-studi/manage-sebaran-kemajuan-studi.component';

export const SebaranKemajuanStudiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SebaranKemajuanStudiComponent,
      },
      {
        path: 'manage-sebaran-kemajuan-studi/:id',
        data: { recTitle: 'Update Data SebaranKemajuanStudi' },
        component: ManageSebaranKemajuanStudiComponent,
      },
      {
        path: 'manage-sebaran-kemajuan-studi',
        data: { recTitle: 'Tambah Data SebaranKemajuanStudi' },
        component: ManageSebaranKemajuanStudiComponent,
      },
    ],
  },
];
