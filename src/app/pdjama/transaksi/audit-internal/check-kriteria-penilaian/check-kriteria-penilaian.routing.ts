import { Routes } from '@angular/router';

import { CheckKriteriaPenilaianComponent } from './check-kriteria-penilaian.component';

export const CheckKriteriaPenilaianRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: CheckKriteriaPenilaianComponent
      },

    ]
  }
];
