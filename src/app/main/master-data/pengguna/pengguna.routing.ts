import { Routes } from "@angular/router";

import { PenggunaComponent } from "./pengguna.component";
import { ManagePenggunaComponent } from "./manage-pengguna/manage-pengguna.component";

export const PenggunaRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: PenggunaComponent,
      },
      {
        path: "manage-pengguna/:id",
        data: { recTitle: "Update Data Pengguna" },
        component: ManagePenggunaComponent,
      },
      {
        path: "manage-pengguna",
        data: { recTitle: "Tambah Data Pengguna" },
        component: ManagePenggunaComponent,
      },
    ],
  },
];
