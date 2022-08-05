import { Routes } from "@angular/router";

import { JadwalPerkuliahanComponent } from "./jadwal-perkuliahan.component";
import { ManageJadwalPerkuliahanComponent } from "./manage-jadwal-perkuliahan/manage-jadwal-perkuliahan.component";

export const JadwalPerkuliahanRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: JadwalPerkuliahanComponent,
      },
      {
        path: "manage-jadwal-perkuliahan/:id",
        data: { recTitle: "Update Data JadwalPerkuliahan" },
        component: ManageJadwalPerkuliahanComponent,
      },
      {
        path: "manage-jadwal-perkuliahan",
        data: { recTitle: "Tambah Data JadwalPerkuliahan" },
        component: ManageJadwalPerkuliahanComponent,
      },
    ],
  },
];
