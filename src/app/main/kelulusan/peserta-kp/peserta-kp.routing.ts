import { Routes } from '@angular/router';

import { PesertaKPComponent } from './peserta-kp.component';
import { ManagePesertaKPComponent } from './manage-peserta-kp/manage-peserta-kp.component';

export const PesertaKPRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: PesertaKPComponent
      },
      {
        path: 'manage-peserta-kp/:id',
        data: { recTitle: 'Update Data PesertaKP' },
        component: ManagePesertaKPComponent
      },
      {
        path: 'manage-peserta-kp',
        data: { recTitle: 'Tambah Data PesertaKP' },
        component: ManagePesertaKPComponent
      }
    ]
  }
];
