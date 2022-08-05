import { Routes } from "@angular/router";

import { KampusComponent } from "./kampus.component";
import { ManageKampusComponent } from "./manage-kampus/manage-kampus.component";

export const KampusRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: KampusComponent,
      },
      {
        path: "manage-kampus/:id",
        data: { recTitle: "Update Data Kampus" },
        component: ManageKampusComponent,
      },
      {
        path: "manage-kampus",
        data: { recTitle: "Tambah Data Kampus" },
        component: ManageKampusComponent,
      },
    ],
  },
];
