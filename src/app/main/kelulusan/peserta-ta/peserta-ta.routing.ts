import { Routes } from '@angular/router';

import { PesertaTAComponent } from './peserta-ta.component';
import { ManagePesertaTAComponent } from './manage-peserta-ta/manage-peserta-ta.component';

export const PesertaTARoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: PesertaTAComponent
      },
      {
        path: 'manage-peserta-ta/:id',
        data: { recTitle: 'Update Data PesertaTA' },
        component: ManagePesertaTAComponent
      },
      {
        path: 'manage-peserta-ta',
        data: { recTitle: 'Tambah Data PesertaTA' },
        component: ManagePesertaTAComponent
      }
    ]
  }
];
