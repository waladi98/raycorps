import { Routes } from "@angular/router";

import { StatusSeleksiComponent } from "./status-seleksi.component";
import { UbahStatusSeleksiComponent } from "./ubah-status-seleksi/ubah-status-seleksi.component";

export const StatusSeleksiRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: StatusSeleksiComponent,
      },
      {
        path: "ubah-status-seleksi/:id",
        component: UbahStatusSeleksiComponent,
      },
    ],
  },
];
