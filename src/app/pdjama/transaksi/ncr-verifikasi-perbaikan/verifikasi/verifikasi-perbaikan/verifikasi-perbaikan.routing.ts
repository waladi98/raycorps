import { Routes } from '@angular/router';

import { VerifikasiPerbaikanComponent } from './verifikasi-perbaikan.component';
export const TindakPerbaikanRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: VerifikasiPerbaikanComponent
      },
    ]
  }
];
