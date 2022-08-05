import { Routes } from '@angular/router';

import { NCRVerifikasiPerbaikanComponent } from './ncr-verifikasi-perbaikan.component';
export const NCRVerifikasiPerbaikanRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: NCRVerifikasiPerbaikanComponent
      },
      {
        path: "verifikasi",
        loadChildren: () =>
          import("./verifikasi/verifikasi.module").then(
            (m) => m.VerifikasiModule
          ),
      },
    ]
  }
];
