import { Routes } from "@angular/router";

export const MahasiswaSKPIRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./transaksi/transaksi.module").then((m) => m.TransaksiModule),
      },  
      {
        path: "transaksi",
        loadChildren: () =>
          import("./transaksi/transaksi.module").then((m) => m.TransaksiModule),
      },  
      {
        path: "informasi",
        loadChildren: () =>
          import("./informasi/informasi.module").then((m) => m.InformasiModule),
      },  
    ],
  },
];
