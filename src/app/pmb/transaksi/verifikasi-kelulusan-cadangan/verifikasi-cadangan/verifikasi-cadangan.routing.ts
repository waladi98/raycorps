import { Routes } from "@angular/router";

import { VerifikasiCadanganComponent } from "./verifikasi-cadangan.component";

export const VerifikasiCadanganRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: VerifikasiCadanganComponent,
      },
    ],
  },
];
