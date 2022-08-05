import { Routes } from '@angular/router';

import { StatusPerwalianComponent } from './status-perwalian.component';

export const StatusPerwalianRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: StatusPerwalianComponent
      },
    ]
  }
];
