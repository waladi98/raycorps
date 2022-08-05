import { Routes } from '@angular/router';

import { NCRKetidaksesuaianComponent } from './ncr-ketidaksesuaian.component';
export const NCRVerifikasiPerbaikanRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: NCRKetidaksesuaianComponent
      },
      {
        path: "aksi",
        loadChildren: () =>
          import("./aksi/aksi.module").then(
            (m) => m.KetidaksesuaianModule
          ),
      },
    ]
  }
];
