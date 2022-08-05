import { Routes } from "@angular/router";

import { KerjaPraktekComponent } from "./kerja-praktek.component";
import { ManageKerjaPraktekComponent } from "./manage-kerja-praktek/manage-kerja-praktek.component";

export const KerjaPraktekRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: KerjaPraktekComponent,
      },
      {
        path: "manage-kerja-praktek/:id",
        data: { recTitle: "Update Data KerjaPraktek" },
        component: ManageKerjaPraktekComponent,
      },
      {
        path: "manage-kerja-praktek",
        data: { recTitle: "Tambah Data KerjaPraktek" },
        component: ManageKerjaPraktekComponent,
      },
    ],
  },
];
