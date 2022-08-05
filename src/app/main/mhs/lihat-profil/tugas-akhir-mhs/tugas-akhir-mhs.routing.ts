import { Routes } from '@angular/router';

import { TugasAkhirMhsComponent } from './tugas-akhir-mhs.component';

export const TugasAkhirMhsRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: TugasAkhirMhsComponent
      },
    ]
  }
];
