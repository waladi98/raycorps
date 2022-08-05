import { Routes } from '@angular/router';

import { PendidikanComponent } from './pendidikan.component';

export const PendidikanRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: PendidikanComponent
      },
    ]
  }
];
