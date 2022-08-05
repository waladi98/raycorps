import { Routes } from "@angular/router";

export const VerifikasiKelengkapanRoutes: Routes = [
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
        path: "verifikasi-peserta/:formulir_id",
        loadChildren: () =>
          import("./verifikasi-peserta/verifikasi-peserta.module").then(
            (m) => m.VerifikasiPesertaModule
          ),
      },
      //     {
      //       path: "informasi-lengkap-peserta/:formulir_id",
      //       loadChildren: () =>
      //         import(
      //           "./verifikasi-kelengkapan/informasi-lengkap-peserta.module"
      //         ).then((m) => m.InformasiLengkapPesertaModule),
      //     },
    ],
  },
];
