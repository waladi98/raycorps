import { Routes } from "@angular/router";

import { HomeAppComponent } from "./homeApp.component";

export const HomeAppRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: HomeAppComponent,
      },
    ],
  },
];
