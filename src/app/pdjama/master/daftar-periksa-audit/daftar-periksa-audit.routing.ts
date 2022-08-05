import { Routes } from '@angular/router';

import { DaftarPeriksaComponent } from './daftar-periksa-audit.component';
export const ButirPenilaianRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: DaftarPeriksaComponent
      },
      {
        path: "kriteria-penilaian/:kode",
        loadChildren: () =>
          import("./kriteria-penilaian/kriteria-penilaian.module").then(
            (m) => m.KriteriaPenilaianModule
          ),
      },
    ]
  }
];
