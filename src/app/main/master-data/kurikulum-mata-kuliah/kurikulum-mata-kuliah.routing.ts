import { Routes } from "@angular/router";

import { KurikulumMataKuliahComponent } from "./kurikulum-mata-kuliah.component";
import { ManageKurikulumMataKuliahComponent } from "./manage-kurikulum-mata-kuliah/manage-kurikulum-mata-kuliah.component";

export const KurikulumMataKuliahRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: KurikulumMataKuliahComponent,
      },
      {
        path: "manage-kurikulum-mata-kuliah/:id",
        data: { recTitle: "Update Data KurikulumMataKuliah" },
        component: ManageKurikulumMataKuliahComponent,
      },
      {
        path: "manage-kurikulum-mata-kuliah",
        data: { recTitle: "Tambah Data KurikulumMataKuliah" },
        component: ManageKurikulumMataKuliahComponent,
      },
    ],
  },
];
