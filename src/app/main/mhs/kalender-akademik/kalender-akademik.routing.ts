import { Routes } from '@angular/router';

import { KalenderAkademikComponent } from './kalender-akademik.component';

export const KalenderAkademikRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: KalenderAkademikComponent,
      },
    ],
  },
];
