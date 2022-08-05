import { Routes } from "@angular/router";

import { StatusSeleksiComponent } from "./status-seleksi.component";

export const StatusSeleksiRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: StatusSeleksiComponent,
      },
    ],
  },
];
