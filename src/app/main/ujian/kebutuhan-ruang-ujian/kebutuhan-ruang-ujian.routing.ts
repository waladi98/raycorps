import { Routes } from "@angular/router";

import { KebutuhanRuangUjianComponent } from "./kebutuhan-ruang-ujian.component";
import { ManageKebutuhanRuangUjianComponent } from "./manage-kebutuhan-ruang-ujian/manage-kebutuhan-ruang-ujian.component";

export const KebutuhanRuangUjianRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: KebutuhanRuangUjianComponent,
      },
      {
        path: "manage-kebutuhan-ruang-ujian/:id",
        data: { recTitle: "Update Data KebutuhanRuangUjian" },
        component: ManageKebutuhanRuangUjianComponent,
      },
      {
        path: "manage-kebutuhan-ruang-ujian",
        data: { recTitle: "Tambah Data KebutuhanRuangUjian" },
        component: ManageKebutuhanRuangUjianComponent,
      },
    ],
  },
];
