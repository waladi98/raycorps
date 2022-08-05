import { Routes } from "@angular/router";

import { VerifikasiBayarComponent } from "./verifikasi-bayar.component";

export const VerifikasiBayarRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: VerifikasiBayarComponent,
      },
    ],
  },
];
