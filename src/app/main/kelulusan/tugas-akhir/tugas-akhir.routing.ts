import { Routes } from '@angular/router';

import { TugasAkhirComponent } from './tugas-akhir.component';
import { ManageTugasAkhirComponent } from './manage-tugas-akhir/manage-tugas-akhir.component';

export const TugasAkhirRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: TugasAkhirComponent
      },
      {
        path: 'manage-tugas-akhir/:id',
        data: { recTitle: 'Update Data TugasAkhir' },
        component: ManageTugasAkhirComponent
      },
      {
        path: 'manage-tugas-akhir',
        data: { recTitle: 'Tambah Data TugasAkhir' },
        component: ManageTugasAkhirComponent
      }
    ]
  }
];
