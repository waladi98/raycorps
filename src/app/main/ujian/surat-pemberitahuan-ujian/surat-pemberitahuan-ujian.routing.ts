import { Routes } from "@angular/router";

import { SuratPemberitahuanUjianComponent } from "./surat-pemberitahuan-ujian.component";
import { ManageSuratPemberitahuanUjianComponent } from "./manage-surat-pemberitahuan-ujian/manage-surat-pemberitahuan-ujian.component";

export const SuratPemberitahuanUjianRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: SuratPemberitahuanUjianComponent,
      },
      {
        path: "manage-surat-pemberitahuan-ujian/:id",
        data: { recTitle: "Update Data SuratPemberitahuanUjian" },
        component: ManageSuratPemberitahuanUjianComponent,
      },
      {
        path: "manage-surat-pemberitahuan-ujian",
        data: { recTitle: "Tambah Data SuratPemberitahuanUjian" },
        component: ManageSuratPemberitahuanUjianComponent,
      },
    ],
  },
];
