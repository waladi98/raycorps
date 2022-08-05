import { Routes } from "@angular/router";

import { ProsesBuktiBayarComponent } from "./proses-bukti-bayar.component";

export const ProsesBuktiBayarRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: ProsesBuktiBayarComponent,
      },
    ],
  },
];
