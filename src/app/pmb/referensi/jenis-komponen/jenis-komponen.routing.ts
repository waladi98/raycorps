import { Routes } from "@angular/router";

import { JenisKomponenComponent } from "./jenis-komponen.component";
import { UbahJenisKomponenComponent } from "./ubah-jenis-komponen/ubah-jenis-komponen.component";

export const JenisKomponenRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: JenisKomponenComponent,
      },
      {
        path: "ubah-jenis-komponen/:id",
        component: UbahJenisKomponenComponent,
      },
    ],
  },
];
