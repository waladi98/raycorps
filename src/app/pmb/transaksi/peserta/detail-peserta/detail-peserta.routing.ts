import { Routes } from "@angular/router";

import { DetailPesertaComponent } from "./detail-peserta.component";

export const DetailPesertaRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: DetailPesertaComponent,
      },
    ],
  },
];
