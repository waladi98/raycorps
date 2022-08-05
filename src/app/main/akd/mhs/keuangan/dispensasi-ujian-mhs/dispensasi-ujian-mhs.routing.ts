import { Routes } from '@angular/router';

import { DispensasiUjianMhsComponent } from './dispensasi-ujian-mhs.component';

export const DispensasiUjianMhsRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: DispensasiUjianMhsComponent
      },
    ]
  }
];
