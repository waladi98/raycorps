import { Routes } from "@angular/router";

import { JenisDisabilitasComponent } from "./jenis-disabilitas.component";

export const JenisDisabilitasRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: JenisDisabilitasComponent,
      },
    ],
  },
];
