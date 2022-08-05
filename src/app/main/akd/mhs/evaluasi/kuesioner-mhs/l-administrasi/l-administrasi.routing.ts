import { Routes } from '@angular/router';

import { LAdministrasiComponent } from './l-administrasi.component';

export const LAdministrasiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LAdministrasiComponent,
      },
    ],
  },
];
