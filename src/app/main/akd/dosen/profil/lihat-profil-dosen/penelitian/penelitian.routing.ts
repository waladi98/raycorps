import { Routes } from '@angular/router';

import { PenelitianComponent } from './penelitian.component';

export const PenelitianRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PenelitianComponent,
      },
    ],
  },
];
