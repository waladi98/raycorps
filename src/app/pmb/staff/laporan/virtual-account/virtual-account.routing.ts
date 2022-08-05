import { Routes } from '@angular/router';

import { VirtualAccountComponent } from './virtual-account.component';

export const VirtualAccountRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: VirtualAccountComponent,
      },
    ],
  },
];
