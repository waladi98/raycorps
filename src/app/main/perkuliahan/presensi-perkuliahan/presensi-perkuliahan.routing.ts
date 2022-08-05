import { Routes } from "@angular/router";

import { PresensiPerkuliahanComponent } from "./presensi-perkuliahan.component";
import { ManagePresensiPerkuliahanComponent } from "./manage-presensi-perkuliahan/manage-presensi-perkuliahan.component";
import { JadwalKuliahComponent } from "./jadwal-kuliah/jadwal-kuliah.component";

export const PresensiPerkuliahanRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: PresensiPerkuliahanComponent,
      },
      {
        path: "manage-presensi-perkuliahan/:id",
        data: { recTitle: "Update Data PresensiPerkuliahan" },
        component: ManagePresensiPerkuliahanComponent,
      },
      {
        path: "manage-presensi-perkuliahan",
        data: { recTitle: "Tambah Data PresensiPerkuliahan" },
        component: ManagePresensiPerkuliahanComponent,
      },
      {
        path: "rincian-jadwal",
        component: JadwalKuliahComponent,
      },
    ],
  },
];
