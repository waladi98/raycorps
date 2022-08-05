import { Routes } from '@angular/router';

import { RekapPerwalianPerProdiComponent } from './rekap-perwalian-per-prodi.component';
import { ManageRekapPerwalianPerProdiComponent } from './manage-rekap-perwalian-per-prodi/manage-rekap-perwalian-per-prodi.component';

export const RekapPerwalianPerProdiRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: RekapPerwalianPerProdiComponent
      },
      {
        path: 'manage-rekap-perwalian-per-prodi/:id',
        data: { recTitle: 'Update Data Rekap Perwalian Per Prodi' },
        component: ManageRekapPerwalianPerProdiComponent
      },
      {
        path: 'manage-rekap-perwalian-per-prodi',
        data: { recTitle: 'Tambah Data Rekap Perwalian Per Prodi' },
        component: ManageRekapPerwalianPerProdiComponent
      }
    ]
  }
];
