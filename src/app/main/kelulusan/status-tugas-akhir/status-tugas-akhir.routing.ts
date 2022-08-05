import { Routes } from '@angular/router';

import { StatusTugasAkhirComponent } from './status-tugas-akhir.component';
import { ManageStatusTugasAkhirComponent } from './manage-status-tugas-akhir/manage-status-tugas-akhir.component';

export const StatusTugasAkhirRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: StatusTugasAkhirComponent
      },
      {
        path: 'manage-status-tugas-akhir/:id',
        data: { recTitle: 'Update Data Status Tugas Akhir' },
        component: ManageStatusTugasAkhirComponent
      },
      {
        path: 'manage-status-tugas-akhir',
        data: { recTitle: 'Tambah Data Status Tugas Akhir' },
        component: ManageStatusTugasAkhirComponent
      }
    ]
  }
];
