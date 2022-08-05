import { Routes } from "@angular/router";

import { JenisDisabilitasComponent } from "./jenis-disabilitas.component";
import { UbahJenisDisabilitasComponent } from "./ubah-jenis-disabilitas/ubah-jenis-disabilitas.component";

export const JenisDisabilitasRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: JenisDisabilitasComponent,
      },
      {
        path: "ubah-jenis-disabilitas/:id",
        component: UbahJenisDisabilitasComponent,
      },
    ],
  },
];
