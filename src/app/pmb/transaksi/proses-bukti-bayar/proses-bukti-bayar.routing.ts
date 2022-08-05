import { Routes } from "@angular/router";

export const ProsesBuktiBayarRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./daftar-pendaftar/proses-bukti-bayar.module").then(
            (m) => m.ProsesBuktiBayarModule
          ),
      },
      {
        path: "verifikasi-bayar/:id",
        loadChildren: () =>
          import("./verifikasi-bukti-bayar/verifikasi-bayar.module").then(
            (m) => m.VerifikasiBayarModule
          ),
      },
    ],
  },
];
