import { Routes } from '@angular/router';

import { KemajuanStudiComponent } from './kemajuan-studi.component';

export const KemajuanStudiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: KemajuanStudiComponent,
      },
    ],
  },
];
