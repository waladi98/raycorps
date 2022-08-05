import { Routes } from '@angular/router';

import { TahunPeriodeComponent } from './tahun-periode.component';
export const TahunPeriodeRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: TahunPeriodeComponent
      },
    ]
  }
];
