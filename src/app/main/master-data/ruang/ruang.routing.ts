import { Routes } from "@angular/router";

import { RuangComponent } from "./ruang.component";
import { ManageRuangComponent } from "./manage-ruang/manage-ruang.component";

export const RuangRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: RuangComponent,
      },
      {
        path: "manage-ruang/:id",
        data: { recTitle: "Update Data Ruang" },
        component: ManageRuangComponent,
      },
      {
        path: "manage-ruang",
        data: { recTitle: "Tambah Data Ruang" },
        component: ManageRuangComponent,
      },
    ],
  },
];
