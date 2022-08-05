import { Routes } from "@angular/router";

import { PimpinanComponent } from "./pimpinan.component";
import { ManagePimpinanComponent } from "./manage-pimpinan/manage-pimpinan.component";

export const PimpinanRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: PimpinanComponent,
      },
      {
        path: "manage-pimpinan/:id",
        data: { recTitle: "Update Data Pimpinan" },
        component: ManagePimpinanComponent,
      },
      {
        path: "manage-pimpinan",
        data: { recTitle: "Tambah Data Pimpinan" },
        component: ManagePimpinanComponent,
      },
    ],
  },
];
