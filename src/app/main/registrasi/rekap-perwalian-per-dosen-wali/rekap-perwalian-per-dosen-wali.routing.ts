import { Routes } from '@angular/router';

import { RekapPerwalianPerDosenWaliComponent } from './rekap-perwalian-per-dosen-wali.component';
import { ManageRekapPerwalianPerDosenWaliComponent } from './manage-rekap-perwalian-per-dosen-prodi/manage-rekap-perwalian-per-dosen-wali.component';

export const RekapPerwalianPerDosenWaliRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: RekapPerwalianPerDosenWaliComponent
      },
      {
        path: 'manage-rekap-perwalian-per-dosen-wali/:id',
        data: { recTitle: 'Update Data Rekap Perwalian Per Dosen Wali' },
        component: ManageRekapPerwalianPerDosenWaliComponent
      },
      {
        path: 'manage-rekap-perwalian-per-dosen-wali',
        data: { recTitle: 'Tambah Data Rekap Perwalian Per Dosen Wali' },
        component: ManageRekapPerwalianPerDosenWaliComponent
      }
    ]
  }
];
