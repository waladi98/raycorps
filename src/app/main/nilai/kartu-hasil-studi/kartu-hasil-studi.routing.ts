import { Routes } from '@angular/router';

import { KartuHasilStudiComponent } from './kartu-hasil-studi.component';
import { ManageKartuHasilStudiComponent } from './manage-kartu-hasil-studi/manage-kartu-hasil-studi.component';

export const KartuHasilStudiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: KartuHasilStudiComponent,
      },
      {
        path: 'manage-kartu-hasil-studi/:id',
        data: { recTitle: 'Update Data KartuHasilStudi' },
        component: ManageKartuHasilStudiComponent,
      },
      {
        path: 'manage-kartu-hasil-studi',
        data: { recTitle: 'Tambah Data KartuHasilStudi' },
        component: ManageKartuHasilStudiComponent,
      },
    ],
  },
];
