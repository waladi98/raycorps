import { Routes } from '@angular/router';

import { DispensasiKeuanganMhsComponent } from './dispensasi-keuangan-mhs.component';

export const DispensasiKeuanganMhsRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: DispensasiKeuanganMhsComponent
      },
    ]
  }
];
