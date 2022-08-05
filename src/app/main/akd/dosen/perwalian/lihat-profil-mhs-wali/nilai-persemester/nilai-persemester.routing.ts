import { Routes } from '@angular/router';

import { NilaiPerSemesterComponent } from './nilai-persemester.component';

export const NilaiPerSemesterRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: NilaiPerSemesterComponent,
      },
    ],
  },
];
