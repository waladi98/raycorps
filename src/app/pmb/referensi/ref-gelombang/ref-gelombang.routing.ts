import { Routes } from '@angular/router';

import { RefGelombangComponent } from './ref-gelombang.component';

export const RefGelombangRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: 'ref-gelombang',
        component: RefGelombangComponent
      }
    ]
  }
];
