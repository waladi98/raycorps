import { Routes } from "@angular/router";

export const InformasiRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "butir-penilaian",
        loadChildren: () =>
          import("./daftar-periksa-audit/daftar-periksa-audit.module").then(
            (m) => m.DaftarPeriksaModule
          ),
      },
      {
        path: "bidang",
        loadChildren: () =>
          import("./bidang/bidang.module").then((m) => m.BidangModule),
      },
      {
        path: "tahun-periode",
        loadChildren: () =>
          import("./tahun-periode/tahun-periode.module").then(
            (m) => m.tahunPeriodeModule
          ),
      },
    ],
  },
];
