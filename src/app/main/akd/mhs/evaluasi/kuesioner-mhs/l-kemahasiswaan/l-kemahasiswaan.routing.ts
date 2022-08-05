import { Routes } from '@angular/router';

import { LKemahasiswaanComponent } from './l-kemahasiswaan.component';

export const LKemahasiswaanRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LKemahasiswaanComponent,
      },
    ],
  },
];
