import { Routes } from "@angular/router";

import { LaporanKehadiranMahasiswaComponent } from "./laporan-kehadiran-mahasiswa.component";
import { ManageLaporanKehadiranMahasiswaComponent } from "./manage-laporan-kehadiran-mahasiswa/manage-laporan-kehadiran-mahasiswa.component";

export const LaporanKehadiranMahasiswaRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: LaporanKehadiranMahasiswaComponent,
      },
      {
        path: "manage-laporan-kehadiran-mahasiswa/:id",
        data: { recTitle: "Update Data LaporanKehadiranMahasiswa" },
        component: ManageLaporanKehadiranMahasiswaComponent,
      },
      {
        path: "manage-laporan-kehadiran-mahasiswa",
        data: { recTitle: "Tambah Data LaporanKehadiranMahasiswa" },
        component: ManageLaporanKehadiranMahasiswaComponent,
      },
    ],
  },
];
