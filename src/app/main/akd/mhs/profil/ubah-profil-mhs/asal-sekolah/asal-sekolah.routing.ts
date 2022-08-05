import { Routes } from '@angular/router';

import { AsalSekolahComponent } from './asal-sekolah.component';

export const AsalSekolahRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: AsalSekolahComponent
      },
    ]
  }
];
