import { Routes } from "@angular/router";

import { SuratPemberitahuanKuliahComponent } from "./surat-pemberitahuan-kuliah.component";
import { ManageSuratPemberitahuanKuliahComponent } from "./manage-surat-pemberitahuan-kuliah/manage-surat-pemberitahuan-kuliah.component";

export const SuratPemberitahuanKuliahRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: SuratPemberitahuanKuliahComponent,
      },
      {
        path: "manage-surat-pemberitahuan-kuliah/:id",
        data: { recTitle: "Update Data SuratPemberitahuanKuliah" },
        component: ManageSuratPemberitahuanKuliahComponent,
      },
      {
        path: "manage-surat-pemberitahuan-kuliah",
        data: { recTitle: "Tambah Data SuratPemberitahuanKuliah" },
        component: ManageSuratPemberitahuanKuliahComponent,
      },
    ],
  },
];
