import { Routes } from "@angular/router";

import { JenisMGMComponent } from "./jenis-mgm.component";
import { UbahJenisMGMComponent } from "./ubah-jenis-mgm/ubah-jenis-mgm.component";

export const JenisMGMRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: JenisMGMComponent,
      },
      {
        path: "ubah-jenis-mgm/:id",
        component: UbahJenisMGMComponent,
      },
    ],
  },
];
