import { Routes } from "@angular/router";

import { UjianSusulanComponent } from "./ujian-susulan.component";
import { ManageUjianSusulanComponent } from "./manage-ujian-susulan/manage-ujian-susulan.component";

export const UjianSusulanRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: UjianSusulanComponent,
      },
      {
        path: "manage-ujian-susulan/:id",
        data: { recTitle: "Update Data UjianSusulan" },
        component: ManageUjianSusulanComponent,
      },
      {
        path: "manage-ujian-susulan",
        data: { recTitle: "Tambah Data UjianSusulan" },
        component: ManageUjianSusulanComponent,
      },
    ],
  },
];
