import { Routes } from "@angular/router";

import { MahasiswaComponent } from "./mahasiswa.component";
import { ManageMahasiswaComponent } from "./manage-mahasiswa/manage-mahasiswa.component";

export const MahasiswaRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: MahasiswaComponent,
      },
      {
        path: "manage-mahasiswa/:id",
        data: { recTitle: "Update Data Mahasiswa" },
        component: ManageMahasiswaComponent,
      },
      {
        path: "manage-mahasiswa",
        data: { recTitle: "Tambah Data Mahasiswa" },
        component: ManageMahasiswaComponent,
      },
    ],
  },
];
