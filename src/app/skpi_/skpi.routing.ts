import { Routes } from "@angular/router";
import { PmbChildGuard } from "../core/auth/guards/pmb-child.guard";
import { SmartGuard } from "../core/auth/guards/smart.guard";
import { PmbHomeGuard } from "../core/auth/guards/pmb-home.guard";
export const SkpiRoutes: Routes = [
  {
    path: "",
    redirectTo: "auth/login",
    pathMatch: "full",
  },
  {
    path: "",
    children: [
      {
        path: "dashboard-admin",
        canActivate: [PmbChildGuard],
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "dashboard",
        canActivate: [PmbChildGuard],
        loadChildren: () =>
          import("./dashboard-mhs/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "frame/:modul",
        canActivate: [],
        loadChildren: () =>
          import("../pmb/frame/frame.module").then((m) => m.FrameModule),
      },
      {
        path: "pengusul",
        canActivate: [],
        loadChildren: () =>
          import("./pengusul/pengusul.module").then(
            (m) => m.PengusulModule
          ),
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
  // {
  //   path: "frame/:modul",
  //   canActivate: [SmartGuard],
  //   loadChildren: () =>
  //     import("./frame/frame.module").then((m) => m.FrameModule),
  // },
];
