import { Routes } from "@angular/router";

import { PengaturanComponent } from "./pengaturan.component";

export const PengaturanRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: PengaturanComponent,
      },
    ],
  },
];
