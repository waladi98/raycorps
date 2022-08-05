import { Routes } from "@angular/router";

import { SuratHasilUmpanBalikComponent } from "./surat-hasil-umpan-balik.component";
import { ManageSuratHasilUmpanBalikComponent } from "./manage-surat-hasil-umpan-balik/manage-surat-hasil-umpan-balik.component";

export const SuratHasilUmpanBalikRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: SuratHasilUmpanBalikComponent,
      },
      {
        path: "manage-surat-hasil-umpan-balik/:id",
        data: { recTitle: "Update Data SuratHasilUmpanBalik" },
        component: ManageSuratHasilUmpanBalikComponent,
      },
      {
        path: "manage-surat-hasil-umpan-balik",
        data: { recTitle: "Tambah Data SuratHasilUmpanBalik" },
        component: ManageSuratHasilUmpanBalikComponent,
      },
    ],
  },
];
