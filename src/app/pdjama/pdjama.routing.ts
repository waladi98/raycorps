import { Routes } from "@angular/router";
import { PmbChildGuard } from "../core/auth/guards/pmb-child.guard";
import { PortalGuard } from "../core/auth/guards/portal.guard";
import { PmbHomeGuard } from "../core/auth/guards/pmb-home.guard";
import { SmartGuard } from "../core/auth/guards/smart.guard";
export const PDJamaRoutes: Routes = [
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
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "frame/:modul",
        canActivate: [],
        loadChildren: () =>
          import("../pmb/frame/frame.module").then((m) => m.FrameModule),
      },
      {
        path: "master",
        canActivate: [PmbChildGuard],
        loadChildren: () =>
          import("./master/master.module").then((m) => m.MasterModule),
      },
      {
        path: "transaksi",
        canActivate: [PmbChildGuard],
        loadChildren: () =>
          import("./transaksi/transaksi.module").then((m) => m.TransaksiModule),
      },
    ],
  },
  {
    path: "auth",
    children: [
      {
        path: "login",
        canActivate: [PortalGuard],
        loadChildren: () =>
          import("./login/login.module").then((m) => m.LoginModule),
      },
    ],
  },
];
