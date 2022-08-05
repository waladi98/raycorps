import { Routes } from '@angular/router';

import { CetakNotaDinasComponent } from './cetak-nota-dinas.component';

export const CetakNotaDinasRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CetakNotaDinasComponent,
      },
    ],
  },
];
