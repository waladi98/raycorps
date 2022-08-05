import { Routes } from '@angular/router';

import { UsulanSKPIComponent } from './usulan-skpi.component';

export const UsulanSKPIRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UsulanSKPIComponent,
      },
    ],
  },
];
