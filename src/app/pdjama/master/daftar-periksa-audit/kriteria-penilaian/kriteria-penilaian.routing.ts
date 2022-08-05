import { Routes } from '@angular/router';

import { KriteriaPenilaianComponent } from './kriteria-penilaian.component';

export const KriteriaPenilaianRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: KriteriaPenilaianComponent
      },

    ]
  }
];
