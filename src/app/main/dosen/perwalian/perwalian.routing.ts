import { Routes } from '@angular/router';

import { PerwalianComponent } from './perwalian.component';

export const PerwalianRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PerwalianComponent,
      },
    ],
  },
];
