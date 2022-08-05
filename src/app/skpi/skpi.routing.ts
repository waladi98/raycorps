import { Routes } from "@angular/router";
import { PmbChildGuard } from "../core/auth/guards/pmb-child.guard";
import { PortalGuard } from "../core/auth/guards/portal.guard";
import { PmbHomeGuard } from "../core/auth/guards/pmb-home.guard";
import { SmartGuard } from "../core/auth/guards/smart.guard";
export const SpmiRoutes: Routes = [
  {
    path: "",
    redirectTo: "auth/login",
    pathMatch: "full",
  },
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
  {
    path: "laporan",
    canActivate: [PmbChildGuard],
    loadChildren: () =>
      import("./laporan/laporan.module").then((m) => m.LaporanModule),
  },  
  {
    path: "humas",
    canActivate: [PmbChildGuard],
    loadChildren: () =>
      import("./humas/humas.module").then((m) => m.HumasModule),
  },  
  {
    path: "informasi",
    canActivate: [PmbChildGuard],
    loadChildren: () =>
      import("./informasi/informasi.module").then((m) => m.InformasiModule),
  },  
  {
    path: "mahasiswa",
    canActivate: [PmbChildGuard],
    loadChildren: () =>
      import("./mahasiswa/mahasiswa.module").then((m) => m.MahasiswaModule),
  },  
  {
    path: "referensi",
    canActivate: [PmbChildGuard],
    loadChildren: () =>
      import("./referensi/referensi.module").then((m) => m.ReferensiModule),
  },  
  {
    path: "kaprodi",
    canActivate: [PmbChildGuard],
    loadChildren: () =>
      import("./kaprodi/kaprodi.module").then((m) => m.KaprodiModule),
  },  
  {
    path: "dekan",
    canActivate: [PmbChildGuard],
    loadChildren: () =>
      import("./dekan/dekan.module").then((m) => m.DekanModule),
  },  
  {
    path: "admin",
    canActivate: [PmbChildGuard],
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
  },  
  {
    path: "auth/login",
    children: [
      {
        path: "",
        canActivate: [SmartGuard],
        loadChildren: () =>
          import("./login/login.module").then((m) => m.LoginModule),
      },
    ],
  },
];
