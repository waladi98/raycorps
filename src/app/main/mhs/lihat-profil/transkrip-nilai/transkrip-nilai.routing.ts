import { Routes } from '@angular/router';

import { TranskripNilaiComponent } from './transkrip-nilai.component';

export const TranskripNilaiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TranskripNilaiComponent,
      },
    ],
  },
];
