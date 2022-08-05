import { Routes } from '@angular/router';

import { PekerjaanComponent } from './pekerjaan.component';

export const PekerjaanRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PekerjaanComponent,
      },
    ],
  },
];
