import { Routes } from "@angular/router";

import { AuditInternComponent } from "./audit-intern.component";
import { FormDialogEditComponent } from "./form-dialog-edit/form-dialog-edit.component";

export const AuditInternRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: AuditInternComponent,
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
