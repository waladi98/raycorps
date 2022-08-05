import { Routes } from "@angular/router";
import { PmbChildGuard } from "../core/auth/guards/pmb-child.guard";
import { PmbGuard } from "../core/auth/guards/pmb.guard";
import { PmbHomeGuard } from "../core/auth/guards/pmb-home.guard";
export const PmbRoutes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "",
    children: [
      {
        path: "staff",
        canActivate: [PmbChildGuard],
        loadChildren: () =>
          import("./staff/staff.module").then((m) => m.StaffModule),
      },
      {
        path: "dashboard",
        canActivate: [PmbChildGuard],
        loadChildren: () =>
          import("./dashboard-pmb/dashboard-pmb.module").then(
            (m) => m.DashboardPmbModule
          ),
      },
      {
        path: "dashboard-pmb-adm",
        canActivate: [PmbChildGuard],
        loadChildren: () =>
          import("./dashboard-pmb-adm/dashboard-pmb-adm.module").then(
            (m) => m.DashboardPmbAdmModule
          ),
      },
      {
        path: "dashboard-pmb-keuangan",
        loadChildren: () =>
          import("./dashboard-pmb-keuangan/dashboard-pmb-keuangan.module").then(
            (m) => m.DashboardPmbKeuanganModule
          ),
      },
      {
        path: "dashboard-pmb-pimpinan",
        loadChildren: () =>
          import("./dashboard-pmb-pimpinan/dashboard-pmb-pimpinan.module").then(
            (m) => m.DashboardPmbPimpinanModule
          ),
      },
      {
        path: "transaksi/ubah-password",
        loadChildren: () =>
          import("./ubah_password/ubah_pass.module").then(
            (m) => m.UbahPassModule
          ),
      },
      {
        path: "pendaftaran",
        canActivate: [PmbChildGuard],
        loadChildren: () =>
          import("./pendaftaran/pendaftar.module").then(
            (m) => m.PendaftaranModule
          ),
      },
      {
        path: "referensi",
        canActivate: [PmbChildGuard],
        loadChildren: () =>
          import("./referensi/referensi.module").then((m) => m.ReferensiModule),
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
        path: "informasi",
        canActivate: [PmbChildGuard],
        loadChildren: () =>
          import("./informasi/informasi.module").then((m) => m.InformasiModule),
      },
      {
        path: "frame/:modul",
        canActivate: [PmbChildGuard],
        loadChildren: () =>
          import("./frame/frame.module").then((m) => m.FrameModule),
      },
    ],
  },
  {
    path: "formulir",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./formulir/formulir.module").then((m) => m.FormulirModule),
      },
    ],
  },
  {
    path: "reservasi/:id/:pass",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./reservasi-pmb/reservasi-pmb.module").then(
            (m) => m.ReservasiPmbModule
          ),
      },
    ],
  },
  {
    path: "home",
    children: [
      {
        path: "",
        canActivate: [PmbHomeGuard],
        loadChildren: () =>
          import("./dashboard-pmb-public/dashboard-pmb-public.module").then(
            (m) => m.DashboardPmbPublicModule
          ),
      },
    ],
  },
  {
    path: "auth/login",
    children: [
      {
        path: "",
        canActivate: [PmbGuard],
        loadChildren: () =>
          import("./login/login.module").then((m) => m.LoginModule),
      },
    ],
  },
];
