import { Routes } from '@angular/router';

import { RekapPerwalianPerMKComponent } from './rekap-perwalian-per-mk.component';
import { ManageRekapPerwalianPerMKComponent } from './manage-rekap-perwalian-per-mk/manage-rekap-perwalian-per-mk.component';

export const RekapPerwalianPerMKRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: RekapPerwalianPerMKComponent
      },
      {
        path: 'manage-rekap-perwalian-per-mk/:id',
        data: { recTitle: 'Update Data Rekap Perwalian Per MK' },
        component: ManageRekapPerwalianPerMKComponent
      },
      {
        path: 'manage-rekap-perwalian-per-mk',
        data: { recTitle: 'Tambah Data Rekap Perwalian Per MK' },
        component: ManageRekapPerwalianPerMKComponent
      }
    ]
  }
];
