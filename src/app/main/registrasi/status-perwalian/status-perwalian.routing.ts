import { Routes } from '@angular/router';

import { StatusPerwalianComponent } from './status-perwalian.component';
import { ManageStatusPerwalianComponent } from './manage-status-perwalian/manage-status-perwalian.component';

export const StatusPerwalianRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: StatusPerwalianComponent
      },
      {
        path: 'manage-status-perwalian/:id',
        data: { recTitle: 'Update Data StatusPerwalian' },
        component: ManageStatusPerwalianComponent
      },
      {
        path: 'manage-status-perwalian',
        data: { recTitle: 'Tambah Data StatusPerwalian' },
        component: ManageStatusPerwalianComponent
      }
    ]
  }
];
