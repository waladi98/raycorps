import { Routes } from "@angular/router";

export const MasterPMBRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "tahun-periode",
        loadChildren: () =>
          import("./tahun-periode/tahun-periode.module").then(
            (m) => m.tahunPeriodeModule
          ),
      },
      {
        path: "auditor",
        loadChildren: () =>
          import("./auditor/auditor.module").then((m) => m.AuditorModule),
      },
      {
        path: "bidang",
        loadChildren: () =>
          import("./bidang/bidang.module").then((m) => m.BidangModule),
      },
      {
        path: "daftar-periksa-audit",
        loadChildren: () =>
          import("./daftar-periksa-audit/daftar-periksa-audit.module").then(
            (m) => m.DaftarPeriksaModule
          ),
      },
    ],
  },
];
