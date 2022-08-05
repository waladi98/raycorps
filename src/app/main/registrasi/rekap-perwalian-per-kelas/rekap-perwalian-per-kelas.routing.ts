import { Routes } from '@angular/router';

import { RekapPerwalianPerKelasComponent } from './rekap-perwalian-per-kelas.component';
import { ManageRekapPerwalianPerKelasComponent } from './manage-rekap-perwalian-per-kelas/manage-rekap-perwalian-per-kelas.component';

export const RekapPerwalianPerKelasRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: RekapPerwalianPerKelasComponent
      },
      {
        path: 'manage-rekap-perwalian-per-kelas/:id',
        data: { recTitle: 'Update Data Rekap Perwalian Per Kelas' },
        component: ManageRekapPerwalianPerKelasComponent
      },
      {
        path: 'manage-rekap-perwalian-per-kelas',
        data: { recTitle: 'Tambah Data Rekap Perwalian Per Kelas' },
        component: ManageRekapPerwalianPerKelasComponent
      }
    ]
  }
];
