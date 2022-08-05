import { Routes } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin/admin-layout.component";
import { CustomLayoutComponent } from "./layouts/custom/custom.component";
import { HomeLayoutComponent } from "./layouts/home/home.component";
import { AuthLayoutComponent } from "./layouts/auth/auth-layout.component";
import { MainAuthGuard } from "./core/auth/guards/main-auth.guard";
import { MainNoAuthGuard } from "./core/auth/guards/main-no-auth.guard";
import { PmbGuard } from "./core/auth/guards/pmb.guard";
import { PortalGuard } from "./core/auth/guards/portal.guard";
import { SmartGuard } from "./core/auth/guards/smart.guard";
import { PmbHomeGuard } from "./core/auth/guards/pmb-home.guard";
export const AppRoutes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    canActivate: [PortalGuard],
    component: HomeLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./home-app/homeApp.module").then((m) => m.HomeAppModule),
      },
    ],
  },
  // {
  //   path: "",
  //   canActivate: [MainAuthGuard],
  //   canActivateChild: [MainAuthGuard],
  //   component: AdminLayoutComponent,
  //   children: [
  //     {
  //       path: "",
  //       loadChildren: () =>
  //         import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
  //     },
  //     {
  //       path: "beranda",
  //       loadChildren: () =>
  //         import("./beranda/beranda.module").then((m) => m.BerandaModule),
  //     },
  //     {
  //       path: "home2",
  //       loadChildren: () =>
  //         import("./home/home.module").then((m) => m.HomeModule),
  //     },
  //     {
  //       path: "registrasi",
  //       loadChildren: () =>
  //         import("./main/registrasi/registrasi.module").then(
  //           (m) => m.RegistrasiModule
  //         ),
  //     },
  //     {
  //       path: "master-data",
  //       loadChildren: () =>
  //         import("./main/master-data/master-data.module").then(
  //           (m) => m.MasterDataModule
  //         ),
  //     },
  //     {
  //       path: "mhs",
  //       loadChildren: () =>
  //         import("./main/mhs/mhs.module").then((m) => m.MhsModule),
  //     },
  //     {
  //       path: "akd",
  //       loadChildren: () =>
  //         import("./main/akd/akd.module").then((m) => m.AkdModule),
  //     },
  //     {
  //       path: "akd-jadwal-perkuliahan-mhs",
  //       loadChildren: () =>
  //         import(
  //           "./main/akd-jadwal-perkuliahan-mhs/akd-jadwal-perkuliahan-mhs.module"
  //         ).then((m) => m.AkdJadwalPerkuliahanMhsModule),
  //     },
  //     {
  //       path: "akd-jadwal-praktikum-mhs",
  //       loadChildren: () =>
  //         import(
  //           "./main/akd-jadwal-praktikum-mhs/akd-jadwal-praktikum-mhs.module"
  //         ).then((m) => m.AkdJadwalPraktikumMhsModule),
  //     },
  //     {
  //       path: "akd-cetak-kartu-ujian-mhs",
  //       loadChildren: () =>
  //         import(
  //           "./main/akd-cetak-kartu-ujian-mhs/akd-cetak-kartu-ujian-mhs.module"
  //         ).then((m) => m.AkdCetakKartuUjianMhsModule),
  //     },
  //     {
  //       path: "akd-dashboard-dosen",
  //       loadChildren: () =>
  //         import("./main/akd-dashboard-dosen/akd-dashboard-dosen.module").then(
  //           (m) => m.AkdDashboardDosenModule
  //         ),
  //     },
  //     {
  //       path: "dosen2",
  //       loadChildren: () =>
  //         import("./main/dosen/dosen.module").then((m) => m.DosenModule),
  //     },
  //     {
  //       path: "akd-jadwal-mhs-wali-dosen",
  //       loadChildren: () =>
  //         import(
  //           "./main/akd-jadwal-mhs-wali-dosen/akd-jadwal-mhs-wali-dosen.module"
  //         ).then((m) => m.AkdJadwalMhsWaliDosenModule),
  //     },
  //     {
  //       path: "perkuliahan",
  //       loadChildren: () =>
  //         import("./main/perkuliahan/perkuliahan.module").then(
  //           (m) => m.PerkuliahanModule
  //         ),
  //     },
  //     {
  //       path: "ujian",
  //       loadChildren: () =>
  //         import("./main/ujian/ujian.module").then((m) => m.UjianModule),
  //     },
  //     {
  //       path: "nilai",
  //       loadChildren: () =>
  //         import("./main/nilai/nilai.module").then((m) => m.NilaiModule),
  //     },
  //     {
  //       path: "kelulusan",
  //       loadChildren: () =>
  //         import("./main/kelulusan/kelulusan.module").then(
  //           (m) => m.KelulusanModule
  //         ),
  //     },
  //     {
  //       path: "components",
  //       loadChildren: () =>
  //         import("./components/components.module").then(
  //           (m) => m.ComponentsModule
  //         ),
  //     },
  //     {
  //       path: "forms",
  //       loadChildren: () => import("./forms/forms.module").then((m) => m.Forms),
  //     },
  //     {
  //       path: "tables",
  //       loadChildren: () =>
  //         import("./tables/tables.module").then((m) => m.TablesModule),
  //     },
  //     {
  //       path: "maps",
  //       loadChildren: () =>
  //         import("./maps/maps.module").then((m) => m.MapsModule),
  //     },
  //     {
  //       path: "widgets",
  //       loadChildren: () =>
  //         import("./widgets/widgets.module").then((m) => m.WidgetsModule),
  //     },
  //     {
  //       path: "charts",
  //       loadChildren: () =>
  //         import("./charts/charts.module").then((m) => m.ChartsModule),
  //     },
  //     {
  //       path: "pages",
  //       loadChildren: () =>
  //         import("./pages/pages.module").then((m) => m.PagesModule),
  //     },
  //     {
  //       path: "calendar",
  //       loadChildren: () =>
  //         import("./calendar/calendar.module").then((m) => m.CalendarModule),
  //     },
  //     {
  //       path: "",
  //       loadChildren: () =>
  //         import("./userpage/user.module").then((m) => m.UserModule),
  //     },
  //     {
  //       path: "",
  //       loadChildren: () =>
  //         import("./timeline/timeline.module").then((m) => m.TimelineModule),
  //     },
  //   ],
  // },
  {
    path: "smart",
    canActivate: [SmartGuard],
    component: CustomLayoutComponent,
    children: [
      {
        path: "t",
        loadChildren: () =>
          import("./main/smart.module").then((m) => m.SmartModule),
      },
    ],
  },
  {
    path: "pmb",
    canActivate: [PmbGuard],
    component: CustomLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => import("./pmb/pmb.module").then((m) => m.PmbModule),
      },
    ],
  },
  {
    path: "skpi",
    canActivate: [PortalGuard],
    component: CustomLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./skpi/skpi.module").then((m) => m.SkpiModule),
      },
    ],
  },
  // {
  //   path: "pdjama",
  //   canActivate: [PortalGuard],
  //   component: CustomLayoutComponent,
  //   children: [
  //     {
  //       path: "",
  //       loadChildren: () =>
  //         import("./pdjama/pdjama.module").then((m) => m.PDJamaModule),
  //     },
  //   ],
  // },
  {
    path: "anggaran",
    canActivate: [PortalGuard],
    component: CustomLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./anggaran/anggaran.module").then((m) => m.AnggaranModule),
      },
    ],
  },
  {
    path: "sdm",
    canActivate: [PortalGuard],
    component: CustomLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => import("./sdm/sdm.module").then((m) => m.SdmModule),
      },
    ],
  },
  {
    path: "pdpt",
    canActivate: [PortalGuard],
    component: CustomLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./pdpt/pdpt.module").then((m) => m.PdptModule),
      },
    ],
  },
  {
    path: "layar",
    canActivate: [PortalGuard],
    component: CustomLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./layar/layar.module").then((m) => m.LayarModule),
      },
    ],
  },
  {
    path: "feeder",
    canActivate: [SmartGuard],
    component: CustomLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./feeder/feeder.module").then((m) => m.FeederModule),
      },
    ],
  },
  {
    path: "office",
    canActivate: [SmartGuard],
    component: CustomLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./office/office.module").then((m) => m.OfficeModule),
      },
    ],
  },
  {
    path: "spmi",
    canActivate: [SmartGuard],
    component: CustomLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./spmi/spmi.module").then((m) => m.SpmiModule),
      },
    ],
  },
  {
    path: "sarpra",
    canActivate: [SmartGuard],
    component: CustomLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./sarpra/sarpra.module").then((m) => m.SarpraModule),
      },
    ],
  },
  {
    path: "mbkm",
    canActivate: [SmartGuard],
    component: CustomLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./mbkm/mbkm.module").then((m) => m.MbkmModule),
      },
    ],
  },
  {
    path: "crm",
    canActivate: [SmartGuard],
    component: CustomLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => import("./crm/crm.module").then((m) => m.CrmModule),
      },
    ],
  },
  //modul - akademik
  {
    path: "perkuliahan",
    canActivate: [],
    component: CustomLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./perkuliahan/perkuliahan.module").then(
            (m) => m.PerkuliahanModule
          ),
      },
    ],
  },
  {
    path: "ujian",
    canActivate: [],
    component: CustomLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./ujian/ujian.module").then((m) => m.UjianModule),
      },
    ],
  },
  {
    path: "kelulusan",
    canActivate: [],
    component: CustomLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./kelulusan/kelulusan.module").then((m) => m.KelulusanModule),
      },
    ],
  },
  {
    path: "skpiV2",
    canActivate: [],
    component: CustomLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./skpi/skpi.module").then((m) => m.SkpiModule),
      },
    ],
  },
  {
    path: "registrasi",
    canActivate: [],
    component: CustomLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./registrasi/registrasi.module").then(
            (m) => m.RegistrasiModule
          ),
      },
    ],
  },
  {
    path: "kurikulum",
    canActivate: [],
    component: CustomLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./kurikulum/kurikulum.module").then((m) => m.KurikulumModule),
      },
    ],
  },
  {
    path: "keuangan",
    canActivate: [],
    component: CustomLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./keuangan/keuangan.module").then((m) => m.KeuanganModule),
      },
    ],
  },
  {
    path: "civitas",
    canActivate: [],
    component: CustomLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./civitas/civitas.module").then((m) => m.CivitasModule),
      },
    ],
  },
  {
    path: "404",
    canActivate: [PmbGuard],
    component: CustomLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./page-404/page-404.module").then((m) => m.Page404Module),
      },
    ],
  },
  {
    path: "dashboard",
    canActivate: [PmbGuard],
    component: CustomLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
    ],
  },
  {
    path: "beranda",
    canActivate: [PmbGuard],
    component: CustomLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./beranda/beranda.module").then((m) => m.BerandaModule),
      },
    ],
  },

  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "auth",
        loadChildren: () =>
          import("./pages/pages.module").then((m) => m.PagesModule),
      },
    ],
  },
];
