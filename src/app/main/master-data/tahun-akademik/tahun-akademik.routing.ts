import { Routes } from "@angular/router";

import { TahunAkademikComponent } from "./tahun-akademik.component";
import { ManageTahunAkademikComponent } from "./manage-tahun-akademik/manage-tahun-akademik.component";

export const TahunAkademikRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: TahunAkademikComponent,
      },
      {
        path: "manage-tahun-akademik/:id",
        data: { recTitle: "Update Data TahunAkademik" },
        component: ManageTahunAkademikComponent,
      },
      {
        path: "manage-tahun-akademik",
        data: { recTitle: "Tambah Data TahunAkademik" },
        component: ManageTahunAkademikComponent,
      },
    ],
  },
];
