import { Routes } from '@angular/router';

import { AlamatTetapComponent } from './alamat-tetap.component';

export const AlamatTetapRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: AlamatTetapComponent
      },
    ]
  }
];
