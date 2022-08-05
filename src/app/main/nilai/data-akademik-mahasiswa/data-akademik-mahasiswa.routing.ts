import { Routes } from "@angular/router";

import { DataAkademikMahasiswaComponent } from "./data-akademik-mahasiswa.component";
import { EditDataAkademikMahasiswaComponent } from "./edit-data-akademik-mahasiswa/edit-data-akademik-mahasiswa.component";

export const DataAkademikMahasiswaRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: '',
        component: DataAkademikMahasiswaComponent,
      },
      {
        path: "edit-data-akademik-mahasiswa/:id",
        data: { recTitle: "Update Data AkademikMahasiswa" },
        component: EditDataAkademikMahasiswaComponent,
      },
      {
        path: "edit-data-akademik-mahasiswa",
        data: { recTitle: "Tambah Data AkademikMahasiswa" },
        component: EditDataAkademikMahasiswaComponent,
      },
    ],
  },
];
