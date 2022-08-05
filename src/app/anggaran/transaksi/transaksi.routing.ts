import { Routes } from "@angular/router";

export const TransaksiAnggaranRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "proses-kelengkapan",
        loadChildren: () =>
          import("./verifikasi-kelengkapan/verifikasi-kelengkapan.module").then(
            (m) => m.VerifikasiKelengkapanModule
          ),
      },
      {
        path: "peserta-undur-diri",
        loadChildren: () =>
          import("./peserta-undur-diri/peserta-undur-diri.module").then(
            (m) => m.PesertaUndurDiriModule
          ),
      },
    ],
  },
];
