import { Routes } from '@angular/router';

import { VerifikasiPerbaikanComponent } from './ketidaksesuaian.component';
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
