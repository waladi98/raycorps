import { Routes } from '@angular/router';

import { NCRFinalComponent } from './ncr-final.component';
export const TahunPeriodeRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: NCRFinalComponent
      },
    ]
  }
];
