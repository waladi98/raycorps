import { Routes } from '@angular/router';

import { PengabdianComponent } from './pengabdian.component';

export const PengabdianRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: PengabdianComponent
      },
    ]
  }
];
