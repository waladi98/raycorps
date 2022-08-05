import { Routes } from "@angular/router";

import { JadwalPraktikumMahasiswaComponent } from "./jadwal-praktikum-mahasiswa.component";
import { ManageJadwalPraktikumMahasiswaComponent } from "./manage-jadwal-praktikum-mahasiswa/manage-jadwal-praktikum-mahasiswa.component";

export const JadwalPraktikumMahasiswaRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: JadwalPraktikumMahasiswaComponent,
      },
      {
        path: "manage-jadwal-praktikum-mahasiswa/:id",
        data: { recTitle: "Update Data JadwalPraktikumMahasiswa" },
        component: ManageJadwalPraktikumMahasiswaComponent,
      },
      {
        path: "manage-jadwal-praktikum-mahasiswa",
        data: { recTitle: "Tambah Data JadwalPraktikumMahasiswa" },
        component: ManageJadwalPraktikumMahasiswaComponent,
      },
    ],
  },
];
