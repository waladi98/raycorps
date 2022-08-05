import { Routes } from '@angular/router';

import { RegistrasiUlangComponent } from './registrasi-ulang.component';

export const RegistrasiUlangRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: RegistrasiUlangComponent
      }
    ]
  }
];
