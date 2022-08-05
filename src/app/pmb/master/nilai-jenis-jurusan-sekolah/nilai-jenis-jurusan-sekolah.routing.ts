import { Routes } from "@angular/router";

import { NilaiJenisJurusanSekolahComponent } from "./nilai-jenis-jurusan-sekolah.component";

export const NilaiJenisJurusanSekolahRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: NilaiJenisJurusanSekolahComponent,
      },
    ],
  },
];
