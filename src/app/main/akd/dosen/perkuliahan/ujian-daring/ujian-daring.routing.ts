import { Routes } from '@angular/router';

import { UjianDaringComponent } from './ujian-daring.component';

export const UjianDaringRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UjianDaringComponent,
      },
    ],
  },
];
