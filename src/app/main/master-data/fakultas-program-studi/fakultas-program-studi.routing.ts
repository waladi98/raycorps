import { Routes } from "@angular/router";

import { FakultasProgramStudiComponent } from "./fakultas-program-studi.component";
import { ManageProgramStudiComponent } from "./manage-program-studi/manage-program-studi.component";
import { ManageFakultasComponent } from "./manage-fakultas/manage-fakultas.component";

export const FakultasProgramStudiRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: FakultasProgramStudiComponent,
      },
      {
        path: "manage-prodi/:kode",
        data: { recTitle: "Update Data Prodi" },
        component: ManageProgramStudiComponent,
      },
      {
        path: "manage-prodi",
        data: { recTitle: "Tambah Data Prodi" },
        component: ManageProgramStudiComponent,
      },
      {
        path: "manage-prodi/:kode",
        data: { recTitle: "Update Data Prodi" },
        component: ManageProgramStudiComponent,
      },
      {
        path: "manage-fakultas",
        data: { recTitle: "Tambah Data Fakultas" },
        component: ManageFakultasComponent,
      },
      {
        path: "manage-fakultas/:kode",
        data: { recTitle: "Update Data Fakultas" },
        component: ManageFakultasComponent,
      },
    ],
  },
];
