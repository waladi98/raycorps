import { Routes } from '@angular/router';

import { VerifikasiRegUlangComponent } from './verifikasi-reg-ulang.component';

export const VerifikasiRegUlangRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: VerifikasiRegUlangComponent
      },

    ]
  }
];
