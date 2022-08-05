import { Routes } from "@angular/router";
import { PmbChildGuard } from "../core/auth/guards/pmb-child.guard";
import { SmartGuard } from "../core/auth/guards/smart.guard";
import { PmbHomeGuard } from "../core/auth/guards/pmb-home.guard";
import { PortalGuard } from "../core/auth/guards/portal.guard";
export const AnggaranRoutes: Routes = [
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
          import("./dashboard-anggaran/dashboard-anggaran.module").then(
            (m) => m.DashboardAnggaranModule
          ),
      },
      {
        path: "frame/:modul",
        canActivate: [],
        loadChildren: () =>
          import("../pmb/frame/frame.module").then((m) => m.FrameModule),
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
  // {
  //   path: "frame/:modul",
  //   canActivate: [SmartGuard],
  //   loadChildren: () =>
  //     import("./frame/frame.module").then((m) => m.FrameModule),
  // },
];
