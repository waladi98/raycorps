import { Routes } from "@angular/router";

import { JenisKomponenComponent } from "./jenis-komponen.component";

export const JenisKomponenRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: JenisKomponenComponent,
      },
    ],
  },
];
