import { Routes } from '@angular/router';

import { PengisianKrsComponent } from './pengisian-krs.component';
import { ManagePengisianKrsComponent } from './manage-pengisian-krs/manage-pengisian-krs.component';

export const PengisianKrsRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: PengisianKrsComponent
      },
      {
        path: 'manage-pengisian-krs/:id',
        data: { recTitle: 'Update Data PengisianKrs' },
        component: ManagePengisianKrsComponent
      },
      {
        path: 'manage-pengisian-krs',
        data: { recTitle: 'Tambah Data PengisianKrs' },
        component: ManagePengisianKrsComponent
      }
    ]
  }
];
