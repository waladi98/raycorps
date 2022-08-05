import { Routes } from '@angular/router';

import { PenyebabComponent } from './penyebab.component';
export const TindakLanjutRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: PenyebabComponent
      },
    ]
  }
];
