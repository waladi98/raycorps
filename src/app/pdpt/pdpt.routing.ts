import { Routes } from "@angular/router";
import { PmbChildGuard } from "../core/auth/guards/pmb-child.guard";
import { PortalGuard } from "../core/auth/guards/portal.guard";
import { PmbHomeGuard } from "../core/auth/guards/pmb-home.guard";
export const PdptRoutes: Routes = [
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
        canActivate: [],
        loadChildren: () =>
          import("./dashboard/dashboard.module").then(
            (m) => m.DashboardKeuanganModule
          ),
      },
      {
        path: "frame/:modul",
        canActivate: [],
        loadChildren: () =>
          import("../pmb/frame/frame.module").then((m) => m.FrameModule),
      },
      {
        path: "mahasiswa/overview-mahasiswa",
        canActivate: [],
        loadChildren: () =>
          import("./page-menu/page-menu.module").then((m) => m.PageMenuModule),
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
