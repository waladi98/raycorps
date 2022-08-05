import { Routes } from '@angular/router';

import { DetailKomponenNilaiComponent } from './detail-komponen-nilai.component';

export const DetailKomponenNilaiRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: DetailKomponenNilaiComponent
      }
    ]
  }
];
