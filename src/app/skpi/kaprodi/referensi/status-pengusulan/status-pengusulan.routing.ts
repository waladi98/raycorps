import { Routes } from '@angular/router';

import { StatusPengusulanComponent } from './status-pengusulan.component';

export const StatusPengusulanRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: StatusPengusulanComponent,
      },
    ],
  },
];
