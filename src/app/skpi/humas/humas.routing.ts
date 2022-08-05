import { Routes } from "@angular/router";

export const MasterPMBRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "dashboard-humas-skpi",
        loadChildren: () =>
          import("./dashboard-humas-skpi/dashboard-humas-skpi.module").then((m) => m.DashboardHumasSkpiModule),
      },
    ],
  },
];
 