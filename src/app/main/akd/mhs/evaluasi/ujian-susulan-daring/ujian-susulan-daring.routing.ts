import { Routes } from '@angular/router';

import { UjianSusulanDaringComponent } from './ujian-susulan-daring.component';

export const UjianSusulanDaringRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UjianSusulanDaringComponent,
      },
    ],
  },
];
