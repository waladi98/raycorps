import { Routes } from "@angular/router";

import { StatusDokumenComponent } from "./status-dokumen.component";
import { UbahStatusDokumenComponent } from "./ubah-status-dokumen/ubah-status-dokumen.component";

export const StatusDokumenRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: StatusDokumenComponent,
      },
      {
        path: "ubah-status-dokumen/:id",
        component: UbahStatusDokumenComponent,
      },
    ],
  },
];
