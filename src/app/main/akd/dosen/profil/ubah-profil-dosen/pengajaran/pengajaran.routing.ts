import { Routes } from '@angular/router';

import { PengajaranComponent } from './pengajaran.component';

export const PengajaranRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PengajaranComponent,
      },
    ],
  },
];
