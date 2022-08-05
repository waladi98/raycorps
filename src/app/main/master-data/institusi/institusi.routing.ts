import { Routes } from "@angular/router";

import { InstitusiComponent } from "./institusi.component";
import { ManageInstitusiComponent } from "./manage-institusi/manage-institusi.component";

export const InstitusiRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: InstitusiComponent,
      },
      {
        path: "manage-institusi/:kode",
        data: { recTitle: "Update Data Institusi" },
        component: ManageInstitusiComponent,
      },
      {
        path: "manage-institusi",
        data: { recTitle: "Tambah Data Institusi" },
        component: ManageInstitusiComponent,
      },
    ],
  },
];
