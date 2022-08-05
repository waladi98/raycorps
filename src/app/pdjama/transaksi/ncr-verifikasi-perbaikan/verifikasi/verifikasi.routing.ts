import { Routes } from '@angular/router';

import { VerifikasiComponent } from './verifikasi.component';
export const VerifikasiRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: VerifikasiComponent
      },
    ]
  }
];
