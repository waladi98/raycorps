import { Routes } from '@angular/router';

import { StrukturalComponent } from './struktural.component';

export const StrukturalRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: StrukturalComponent,
      },
    ],
  },
];
