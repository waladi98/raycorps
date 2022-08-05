import { Routes } from "@angular/router";
import { PmbChildGuard } from "../core/auth/guards/pmb-child.guard";
import { SmartGuard } from "../core/auth/guards/smart.guard";
import { PmbHomeGuard } from "../core/auth/guards/pmb-home.guard";
export const SmartRoutes: Routes = [
  {
    path: "",
    redirectTo: "smart",
    pathMatch: "full",
  },
  {
    path: "",
    canActivate: [],
    loadChildren: () =>
      import("./dashboard-public/dashboard-public.module").then(
        (m) => m.DashboardPublicModule
      ),
  },
  {
    path: "auth/login",
    canActivate: [SmartGuard],
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "dashboard-admin",
    canActivate: [],
    loadChildren: () =>
      import("./dashboard-admin/dashboard-admin.module").then(
        (m) => m.DashboardAdminModule
      ),
  },
  {
    path: "master",
    canActivate: [PmbChildGuard],
    loadChildren: () =>
      import("./master-data/master-data.module").then(
        (m) => m.MasterDataModule
      ),
  },
  {
    path: "ujian",
    canActivate: [SmartGuard],
    loadChildren: () =>
      import("./ujian/ujian.module").then((m) => m.UjianModule),
  },

  {
    path: "perkuliahan",
    canActivate: [SmartGuard],
    loadChildren: () =>
      import("./perkuliahan/perkuliahan.module").then(
        (m) => m.PerkuliahanModule
      ),
  },
  {
    path: "nilai",
    canActivate: [SmartGuard],
    loadChildren: () =>
      import("./nilai/nilai.module").then((m) => m.NilaiModule),
  },
  {
    path: "kelulusan",
    canActivate: [SmartGuard],
    loadChildren: () =>
      import("./kelulusan/kelulusan.module").then((m) => m.KelulusanModule),
  },
  {
    path: "registrasi",
    canActivate: [SmartGuard],
    loadChildren: () =>
      import("./registrasi/registrasi.module").then((m) => m.RegistrasiModule),
  },
  {
    path: "menu",
    // canActivate: [MainAuthGuard],
    // canActivateChild: [MainAuthGuard],
    // component: AdminLayoutComponent,
    children: [
      // {
      //   path: "registrasi",
      //   loadChildren: () =>
      //     import("./registrasi/registrasi.module").then(
      //       (m) => m.RegistrasiModule
      //     ),
      // },
      // {
      //   path: "mhs",
      //   loadChildren: () => import("./mhs/mhs.module").then((m) => m.MhsModule),
      // },
      // {
      //   path: "akd",
      //   loadChildren: () => import("./akd/akd.module").then((m) => m.AkdModule),
      // },
      // {
      //   path: "akd-jadwal-perkuliahan-mhs",
      //   loadChildren: () =>
      //     import(
      //       "./akd-jadwal-perkuliahan-mhs/akd-jadwal-perkuliahan-mhs.module"
      //     ).then((m) => m.AkdJadwalPerkuliahanMhsModule),
      // },
      {
        path: "akd-jadwal-praktikum-mhs",
        loadChildren: () =>
          import(
            "./akd-jadwal-praktikum-mhs/akd-jadwal-praktikum-mhs.module"
          ).then((m) => m.AkdJadwalPraktikumMhsModule),
      },
      {
        path: "akd-cetak-kartu-ujian-mhs",
        loadChildren: () =>
          import(
            "./akd-cetak-kartu-ujian-mhs/akd-cetak-kartu-ujian-mhs.module"
          ).then((m) => m.AkdCetakKartuUjianMhsModule),
      },
      {
        path: "akd-dashboard-dosen",
        loadChildren: () =>
          import("./akd-dashboard-dosen/akd-dashboard-dosen.module").then(
            (m) => m.AkdDashboardDosenModule
          ),
      },
      {
        path: "dosen2",
        loadChildren: () =>
          import("./dosen/dosen.module").then((m) => m.DosenModule),
      },
      {
        path: "akd-jadwal-mhs-wali-dosen",
        loadChildren: () =>
          import(
            "./akd-jadwal-mhs-wali-dosen/akd-jadwal-mhs-wali-dosen.module"
          ).then((m) => m.AkdJadwalMhsWaliDosenModule),
      },
      {
        path: "perkuliahan",
        loadChildren: () =>
          import("./perkuliahan/perkuliahan.module").then(
            (m) => m.PerkuliahanModule
          ),
      },
      {
        path: "nilai",
        loadChildren: () =>
          import("./nilai/nilai.module").then((m) => m.NilaiModule),
      },
      {
        path: "kelulusan",
        loadChildren: () =>
          import("./kelulusan/kelulusan.module").then((m) => m.KelulusanModule),
      },
    ],
  },
];
