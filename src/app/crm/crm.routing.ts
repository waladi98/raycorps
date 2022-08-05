import { Routes } from "@angular/router";
import { PmbChildGuard } from "../core/auth/guards/pmb-child.guard";
import { PmbGuard } from "../core/auth/guards/pmb.guard";
import { PmbHomeGuard } from "../core/auth/guards/pmb-home.guard";
import { SmartGuard } from "../core/auth/guards/smart.guard";
export const CrmRoutes: Routes = [
  {
    path: "",
    redirectTo: "auth/login",
    pathMatch: "full",
  },
  {
    path: "",
    children: [
      {
        path: "dashboard",
        canActivate: [PmbChildGuard],
        loadChildren: () =>
          import("./dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "frame/:modul",
        canActivate: [],
        loadChildren: () =>
          import("../pmb/frame/frame.module").then((m) => m.FrameModule),
      },
    ],
  },
  {
    path: "auth",
    children: [
      {
        path: "login",
        canActivate: [SmartGuard],
        loadChildren: () =>
          import("./login/login.module").then((m) => m.LoginModule),
      },
    ],
  },
];
