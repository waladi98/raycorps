import { Routes } from "@angular/router";

import { NilaiJenisFormulirComponent } from "./nilai-jenis-formulir.component";

export const NilaiJenisFormulirRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: NilaiJenisFormulirComponent,
      },
    ],
  },
];
