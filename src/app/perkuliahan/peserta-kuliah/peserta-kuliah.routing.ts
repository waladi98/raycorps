import { Routes } from "@angular/router";

import { PesertaKuliahComponent } from "./peserta-kuliah.component";
import { ManagePesertaKuliahComponent } from "./manage-peserta-kuliah/manage-peserta-kuliah.component";

export const PesertaKuliahRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: PesertaKuliahComponent,
      },
      {
        path: "manage-peserta-kuliah/:id",
        data: { recTitle: "Update Data PesertaKuliah" },
        component: ManagePesertaKuliahComponent,
      },
      {
        path: "manage-peserta-kuliah",
        data: { recTitle: "Tambah Data PesertaKuliah" },
        component: ManagePesertaKuliahComponent,
      },
    ],
  },
];
