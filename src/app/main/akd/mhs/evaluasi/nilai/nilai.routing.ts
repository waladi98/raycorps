import { Routes } from '@angular/router';

import { NilaiComponent } from './nilai.component';

export const NilaiRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: NilaiComponent
      },
    ]
  }
];
