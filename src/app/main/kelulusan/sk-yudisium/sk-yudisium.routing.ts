import { Routes } from '@angular/router';

import { SKYudisiumComponent } from './sk-yudisium.component';
import { ManageSKYudisiumComponent } from './manage-sk-yudisium/manage-sk-yudisium.component';

export const SKYudisiumRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: SKYudisiumComponent
      },
      {
        path: 'manage-sk-yudisium/:id',
        data: { recTitle: 'Update Data SK Yudisium' },
        component: ManageSKYudisiumComponent
      },
      {
        path: 'manage-sk-yudisium',
        data: { recTitle: 'Tambah Data SK Yudisium' },
        component: ManageSKYudisiumComponent
      }
    ]
  }
];
