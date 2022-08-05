import { Routes } from '@angular/router';

import { GelombangComponent } from './gelombang.component';
import { UbahGelombangComponent } from './ubah-gelombang/ubah-gelombang.component';

export const GelombangRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: GelombangComponent
      },
      {
        path: "ubah-gelombang/:id",
        component: UbahGelombangComponent,
      },
      
    ]
  }
];
