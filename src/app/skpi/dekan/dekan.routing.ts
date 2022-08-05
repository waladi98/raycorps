import { Routes } from "@angular/router";

export const DekanSKPIRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./referensi/referensi.module").then((m) => m.ReferensiModule),
      },  
      {
        path: "referensi",
        loadChildren: () =>
          import("./referensi/referensi.module").then((m) => m.ReferensiModule),
      },  
      {
        path: "master",
        loadChildren: () =>
          import("./master/master.module").then((m) => m.MasterModule),
      },  
      {
        path: "transaksi",
        loadChildren: () =>
          import("./transaksi/transaksi.module").then((m) => m.TransaksiModule),
      },  
      {
        path: "laporan",
        loadChildren: () =>
          import("./laporan/laporan.module").then((m) => m.LaporanModule),
      },  
    ],
  },
];
