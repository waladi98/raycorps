import { Routes } from "@angular/router";

import { RekapJasComponent } from "./rekap-jas.component";
import { DetailKomponenNilaiComponent } from "./detail-komponen-nilai/detail-komponen-nilai.component";
import { TambahDataComponent } from "./tambah-data/tambah-data.component";
export const RekapJasRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: RekapJasComponent,
      },
      {
        path: "detail-komponen-nilai",
        component: DetailKomponenNilaiComponent,
      },
      {
        path: "tambah-data",
        component: TambahDataComponent,
      },
    ],
  },
];
