import { Routes } from "@angular/router";

import { StatusDokumenComponent } from "./status-dokumen.component";

export const StatusDokumenRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: StatusDokumenComponent,
      },
    ],
  },
];
