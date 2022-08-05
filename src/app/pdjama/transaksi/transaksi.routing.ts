import { Routes } from "@angular/router";

export const transaksiRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "bidang",
        loadChildren: () =>
          import("./bidang/bidang.module").then((m) => m.BidangModule),
      },
      {
        path: "ncr-final",
        loadChildren: () =>
          import("./ncr-final/ncr-final.module").then((m) => m.NCRFinalModule),
      },
      {
        path: "ncr-perbaikan",
        loadChildren: () =>
          import("./ncr-perbaikan/ncr-perbaikan.module").then(
            (m) => m.NCRPerbaikanModule
          ),
      },
      {
        path: "ncr-verifikasi-perbaikan",
        loadChildren: () =>
          import(
            "./ncr-verifikasi-perbaikan/ncr-verifikasi-perbaikan.module"
          ).then((m) => m.NCRVerifikasiPerbaikanModule),
      },
      {
        path: "ncr-ketidaksesuaian",
        loadChildren: () =>
          import("./ncr-ketidaksesuaian/ncr-ketidaksesuaian.module").then(
            (m) => m.NCRKetidaksesuaianModule
          ),
      },
      // {
      //   path: "audit-internall",
      //   loadChildren: () =>
      //     import("./audit-intern/audit-intern.module").then(
      //       (m) => m.AuditInternModule
      //     ),
      // },
      // {
      //   path: "audit-internal",
      //   loadChildren: () =>
      //     import("./audit-internal/audit-internal.module").then(
      //       (m) => m.AuditInternalModule
      //     ),
      // },
    ],
  },
];
