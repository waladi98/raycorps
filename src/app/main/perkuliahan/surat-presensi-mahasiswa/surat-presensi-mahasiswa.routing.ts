import { Routes } from "@angular/router";

import { SuratPresensiMahasiswaComponent } from "./surat-presensi-mahasiswa.component";
import { ManageSuratPresensiMahasiswaComponent } from "./manage-surat-presensi-mahasiswa/manage-surat-presensi-mahasiswa.component";

export const SuratPresensiMahasiswaRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: SuratPresensiMahasiswaComponent,
      },
      {
        path: "manage-surat-presensi-mahasiswa/:id",
        data: { recTitle: "Update Data SuratPresensiMahasiswa" },
        component: ManageSuratPresensiMahasiswaComponent,
      },
      {
        path: "manage-surat-presensi-mahasiswa",
        data: { recTitle: "Tambah Data SuratPresensiMahasiswa" },
        component: ManageSuratPresensiMahasiswaComponent,
      },
    ],
  },
];
