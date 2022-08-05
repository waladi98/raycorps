import { Routes } from "@angular/router";

import { AuditInternalComponent } from "./audit-internal.component";
export const AuditInternalRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: AuditInternalComponent,
      },
      {
        path: "kriteria-penilaian/:id",
        loadChildren: () =>
          import("./kriteria-penilaian/kriteria-penilaian.module").then(
            (m) => m.KriteriaPenilaianModule
          ),
      },
      {
        path: "check-kriteria-penilaian",
        loadChildren: () =>
          import(
            "./check-kriteria-penilaian/check-kriteria-penilaian.module"
          ).then((m) => m.CheckKriteriaPenilaianModule),
      },
    ],
  },
];
