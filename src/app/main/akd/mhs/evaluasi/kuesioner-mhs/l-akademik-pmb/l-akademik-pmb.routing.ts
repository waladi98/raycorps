import { Routes } from '@angular/router';

import { LAkademikPmbComponent } from './l-akademik-pmb.component';

export const LAkademikPmbRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LAkademikPmbComponent,
      },
    ],
  },
];
