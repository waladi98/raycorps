import { Routes } from "@angular/router";

import { DashboardPublicComponent } from "./dashboard-public.component";

export const DashboardPublicRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: DashboardPublicComponent,
      },
    ],
  },
];
