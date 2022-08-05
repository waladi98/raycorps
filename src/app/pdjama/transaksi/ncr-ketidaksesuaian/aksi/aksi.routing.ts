import { Routes } from '@angular/router';

import { KetidaksesuaianComponent } from './aksi.component';
export const KetidaksesuaianRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: KetidaksesuaianComponent
      },
    ]
  }
];
