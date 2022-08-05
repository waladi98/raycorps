import { Routes } from '@angular/router';

import { NoSKComponent } from './no-sk.component';

export const NoSKRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: NoSKComponent,
      },
    ],
  },
];
