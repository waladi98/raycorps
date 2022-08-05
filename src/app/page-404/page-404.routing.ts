import { Routes } from "@angular/router";

import { Page404Component } from "./page-404.component";

export const HomeRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: Page404Component,
      },
    ],
  },
];
