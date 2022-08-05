import { Routes } from '@angular/router';

import { PartisipasiComponent } from './partisipasi.component';

export const PartisipasiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PartisipasiComponent,
      },
    ],
  },
];
