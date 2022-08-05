import { Routes } from '@angular/router';

import { AkademikComponent } from './akademik.component';

export const AkademikRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AkademikComponent,
      },
    ],
  },
];
