import { Routes } from "@angular/router";

import { AkademikMahasiswaComponent } from "./akademik-mahasiswa.component";
import { ManageAkademikMahasiswaComponent } from "./manage-akademik-mahasiswa/manage-akademik-mahasiswa.component";

export const AkademikMahasiswaRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: AkademikMahasiswaComponent,
      },
      {
        path: "manage-akademik-mahasiswa/:kode",
        data: { recTitle: "Update Data AkademikMahasiswa" },
        component: ManageAkademikMahasiswaComponent,
      },
      {
        path: "manage-akademik-mahasiswa",
        data: { recTitle: "Tambah Data AkademikMahasiswa" },
        component: ManageAkademikMahasiswaComponent,
      },
    ],
  },
];
