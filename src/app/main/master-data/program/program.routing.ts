import { Routes } from "@angular/router";

import { ProgramComponent } from "./program.component";
import { ManageProgramComponent } from "./manage-program/manage-program.component";

export const ProgramRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: ProgramComponent,
      },
      {
        path: "manage-program/:kode",
        data: { recTitle: "Update Data Program" },
        component: ManageProgramComponent,
      },
      {
        path: "manage-program",
        data: { recTitle: "Tambah Data Program" },
        component: ManageProgramComponent,
      },
    ],
  },
];
