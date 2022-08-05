import { Routes } from '@angular/router';

import { UbahPassComponent } from './ubah_pass.component';

export const UbahPassRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: UbahPassComponent
      }
    ]
  }
];
