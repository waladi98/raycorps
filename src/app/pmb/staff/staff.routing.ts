import { Routes } from "@angular/router";

export const StaffRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "referensi",
        loadChildren: () =>
          import("./referensi/referensi.module").then((m) => m.ReferensiModule),
      },
      {
        path: "penyaringan-pmb",
        loadChildren: () =>
          import("./penyaringan-pmb/penyaringan-pmb.module").then(
            (m) => m.PenyaringanPMBModule
          ),
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
      {
        path: "informasi",
        loadChildren: () =>
          import("./informasi/informasi.module").then((m) => m.InformasiModule),
      },
    ],
  },
];
