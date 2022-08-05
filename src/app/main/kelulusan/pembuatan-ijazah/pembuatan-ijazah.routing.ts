import { Routes } from "@angular/router";

import { PembuatanIjazahComponent } from "./pembuatan-ijazah.component";
import { ManagePembuatanIjazahComponent } from "./manage-pembuatan-ijazah/manage-pembuatan-ijazah.component";

export const PembuatanIjazahRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: PembuatanIjazahComponent,
      },
      {
        path: "manage-pembuatan-ijazah/:id",
        data: { recTitle: "Update Data Status Tugas Akhir" },
        component: ManagePembuatanIjazahComponent,
      },
      {
        path: "manage-pembuatan-ijazah",
        data: { recTitle: "Tambah Data Status Tugas Akhir" },
        component: ManagePembuatanIjazahComponent,
      },
    ],
  },
];
