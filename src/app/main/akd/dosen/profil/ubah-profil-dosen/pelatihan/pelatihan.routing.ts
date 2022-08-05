import { Routes } from '@angular/router';

import { PelatihanComponent } from './pelatihan.component';

export const PelatihanRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: PelatihanComponent
      },
    ]
  }
];
