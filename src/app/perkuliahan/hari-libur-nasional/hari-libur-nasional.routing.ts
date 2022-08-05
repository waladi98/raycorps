import { Routes } from "@angular/router";

import { HariLiburNasionalComponent } from "./hari-libur-nasional.component";
import { ManageHariLiburNasionalComponent } from "./manage-hari-libur-nasional/manage-hari-libur-nasional.component";

export const HariLiburNasionalRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: HariLiburNasionalComponent,
      },
      {
        path: "manage-hari-libur-nasional/:id",
        data: { recTitle: "Update Data HariLiburNasional" },
        component: ManageHariLiburNasionalComponent,
      },
      {
        path: "manage-hari-libur-nasional",
        data: { recTitle: "Tambah Data HariLiburNasional" },
        component: ManageHariLiburNasionalComponent,
      },
    ],
  },
];
