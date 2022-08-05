import { Routes } from "@angular/router";

import { JasAlmamaterComponent } from "./jas-almamater.component";
import { UbahJasAlmamaterComponent } from "./ubah-jas-almamater/ubah-jas-almamater.component";

export const JasAlmamaterRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: JasAlmamaterComponent,
      },
      {
        path: "ubah-jas-almamater/:id",
        component: UbahJasAlmamaterComponent,
      },
    ],
  },
];
