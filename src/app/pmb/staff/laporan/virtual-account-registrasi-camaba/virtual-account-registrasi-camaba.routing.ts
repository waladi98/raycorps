import { Routes } from '@angular/router';

import { VirtualAccountRegistrasiCamabaComponent } from './virtual-account-registrasi-camaba.component';

export const VirtualAccountRegistrasiCamabaRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: VirtualAccountRegistrasiCamabaComponent,
      },
    ],
  },
];
