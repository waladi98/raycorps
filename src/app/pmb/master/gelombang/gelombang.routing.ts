import { Routes } from "@angular/router";

import { GelombangComponent } from "./gelombang.component";
import { TambahGelombangComponent } from "./tambah-gelombang/tambah-gelombang.component";
import { UbahGelombangComponent } from "./ubah-gelombang/ubah-gelombang.component";
import { DetailGelombangComponent } from "./detail-gelombang/detail-gelombang.component";

export const GelombangRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: GelombangComponent,
      },
      {
        path: "tambah-gelombang",
        component: TambahGelombangComponent,
      },
      {
        path: "ubah-gelombang/:kode",
        component: TambahGelombangComponent,
      },
      {
        path: "detail-gelombang/:kode",
        component: DetailGelombangComponent,
      },
    ],
  },
];
