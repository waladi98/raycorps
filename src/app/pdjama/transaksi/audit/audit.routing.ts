import { Routes } from '@angular/router';

import { AuditComponent } from './audit.component';
export const AuditRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: AuditComponent
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
