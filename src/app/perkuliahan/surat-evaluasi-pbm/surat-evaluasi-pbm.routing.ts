import { Routes } from "@angular/router";

import { SuratEvaluasiPbmComponent } from "./surat-evaluasi-pbm.component";
import { ManageSuratEvaluasiPbmComponent } from "./manage-surat-evaluasi-pbm/manage-surat-evaluasi-pbm.component";

export const SuratEvaluasiPbmRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: SuratEvaluasiPbmComponent,
      },
      {
        path: "manage-surat-evaluasi-pbm/:id",
        data: { recTitle: "Update Data SuratEvaluasiPbm" },
        component: ManageSuratEvaluasiPbmComponent,
      },
      {
        path: "manage-surat-evaluasi-pbm",
        data: { recTitle: "Tambah Data SuratEvaluasiPbm" },
        component: ManageSuratEvaluasiPbmComponent,
      },
    ],
  },
];
