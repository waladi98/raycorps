import { Routes } from "@angular/router";

export const TransaksiRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "verifikasi-kegiatan-sk3",
        loadChildren: () =>
          import("./verifikasi-kegiatan-sk3/verifikasi-kegiatan-sk3.module").then((m) => m.VerifikasiKegiatanSK3Module),
      },  
      {
        path: "verifikasi-usulan-skpi",
        loadChildren: () =>
          import("./verifikasi-usulan-skpi/verifikasi-usulan-skpi.module").then((m) => m.VerifikasiUsulanSKPIModule),
      },  
    ],
  },
];
