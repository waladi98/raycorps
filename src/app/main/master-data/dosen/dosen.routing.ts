import { Routes } from "@angular/router";

import { DosenComponent } from "./dosen.component";
import { ManageDosenComponent } from "./manage-dosen/manage-dosen.component";

export const DosenRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: DosenComponent,
      },
      {
        path: "manage-dosen/:kode",
        data: { recTitle: "Update Data Dosen" },
        component: ManageDosenComponent,
      },
      {
        path: "manage-dosen",
        data: { recTitle: "Tambah Data Dosen" },
        component: ManageDosenComponent,
      },
    ],
  },
];
