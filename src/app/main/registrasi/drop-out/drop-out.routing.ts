import { Routes } from '@angular/router';

import { DropOutComponent } from './drop-out.component';
import { ManageDropOutComponent } from './manage-drop-out/manage-drop-out.component';

export const DropOutRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: DropOutComponent
      },
      {
        path: 'manage-drop-out/:id',
        data: { recTitle: 'Update Data DropOut' },
        component: ManageDropOutComponent
      },
      {
        path: 'manage-drop-out',
        data: { recTitle: 'Tambah Data DropOut' },
        component: ManageDropOutComponent
      }
    ]
  }
];
