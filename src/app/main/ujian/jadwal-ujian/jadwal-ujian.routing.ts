import { Routes } from "@angular/router";

import { JadwalUjianComponent } from "./jadwal-ujian.component";
import { ManageJadwalUjianComponent } from "./manage-jadwal-ujian/manage-jadwal-ujian.component";

export const JadwalUjianRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: JadwalUjianComponent,
      },
      {
        path: "manage-jadwal-ujian/:id",
        data: { recTitle: "Update Data JadwalUjian" },
        component: ManageJadwalUjianComponent,
      },
      {
        path: "manage-jadwal-ujian",
        data: { recTitle: "Tambah Data JadwalUjian" },
        component: ManageJadwalUjianComponent,
      },
    ],
  },
];
