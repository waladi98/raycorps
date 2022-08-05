import { Routes } from "@angular/router";

import { DaftarHadirUjianComponent } from "./daftar-hadir-ujian.component";
import { ManageDaftarHadirUjianComponent } from "./manage-daftar-hadir-ujian/manage-daftar-hadir-ujian.component";

export const DaftarHadirUjianRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: DaftarHadirUjianComponent,
      },
      {
        path: "manage-daftar-hadir-ujian/:id",
        data: { recTitle: "Update Data DaftarHadirUjian" },
        component: ManageDaftarHadirUjianComponent,
      },
      {
        path: "manage-daftar-hadir-ujian",
        data: { recTitle: "Tambah Data DaftarHadirUjian" },
        component: ManageDaftarHadirUjianComponent,
      },
    ],
  },
];
