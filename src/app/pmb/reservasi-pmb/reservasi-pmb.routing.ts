import { Routes } from '@angular/router';

import { ReservasiPmbComponent } from './reservasi-pmb.component';

export const ReservasiPmbRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: ReservasiPmbComponent
      }
    ]
  }
];
