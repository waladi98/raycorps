import { Routes } from "@angular/router";

export const VerifikasiKelulusanCadanganRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./daftar-peserta-pmb/daftar-peserta-pmb.module").then(
            (m) => m.DaftarPesertaPMBModule
          ),
      },
      {
        path: "informasi-lengkap-peserta/:formulir_id",
        loadChildren: () =>
          import(
            "./informasi-lengkap-peserta/informasi-lengkap-peserta.module"
          ).then((m) => m.InformasiLengkapPesertaModule),
      },
      {
        path: "verifikasi-cadangan/:formulir_id",
        loadChildren: () =>
          import("./verifikasi-cadangan/verifikasi-cadangan.module").then(
            (m) => m.VerifikasiCadanganModule
          ),
      },
    ],
  },
];
