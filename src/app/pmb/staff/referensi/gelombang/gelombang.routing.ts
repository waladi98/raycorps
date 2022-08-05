import { Routes } from '@angular/router';

import { GelombangComponent } from './gelombang.component';

export const GelombangRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: GelombangComponent
      }
    ]
  }
];
