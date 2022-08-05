import { Routes } from '@angular/router';

import { StatusAkademikComponent } from './status-akademik.component';

export const StatusAkademikRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: StatusAkademikComponent,
      },
    ],
  },
];
