import { Routes } from "@angular/router";

import { PageMenuComponent } from "./page-menu.component";
import { ManageAkademikMahasiswaComponent } from "./manage-akademik-mahasiswa/manage-akademik-mahasiswa.component";

export const PageMenuRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: PageMenuComponent,
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
