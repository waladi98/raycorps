import { Routes } from "@angular/router";

import { RekapKehadiranMahasiswaComponent } from "./rekap-kehadiran-mahasiswa.component";
import { ManageRekapKehadiranMahasiswaComponent } from "./manage-rekap-kehadiran-mahasiswa/manage-rekap-kehadiran-mahasiswa.component";

export const RekapKehadiranMahasiswaRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: RekapKehadiranMahasiswaComponent,
      },
      {
        path: "manage-rekap-kehadiran-mahasiswa/:id",
        data: { recTitle: "Update Data RekapKehadiranMahasiswa" },
        component: ManageRekapKehadiranMahasiswaComponent,
      },
      {
        path: "manage-rekap-kehadiran-mahasiswa",
        data: { recTitle: "Tambah Data RekapKehadiranMahasiswa" },
        component: ManageRekapKehadiranMahasiswaComponent,
      },
    ],
  },
];
