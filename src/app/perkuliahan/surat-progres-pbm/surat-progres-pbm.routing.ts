import { Routes } from "@angular/router";

import { SuratProgresPbmComponent } from "./surat-progres-pbm.component";
import { ManageSuratProgresPbmComponent } from "./manage-surat-progres-pbm/manage-surat-progres-pbm.component";

export const SuratProgresPbmRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: SuratProgresPbmComponent,
      },
      {
        path: "manage-surat-progres-pbm/:id",
        data: { recTitle: "Update Data SuratProgresPbm" },
        component: ManageSuratProgresPbmComponent,
      },
      {
        path: "manage-surat-progres-pbm",
        data: { recTitle: "Tambah Data SuratProgresPbm" },
        component: ManageSuratProgresPbmComponent,
      },
    ],
  },
];
