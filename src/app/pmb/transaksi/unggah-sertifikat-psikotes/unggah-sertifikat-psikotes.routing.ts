import { Routes } from "@angular/router";

export const UnggahSertifikatPsikotesRoutes: Routes = [
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
        path: "verifikasi-peserta/:formulir_id",
        loadChildren: () =>
          import("./verifikasi-peserta/verifikasi-peserta.module").then(
            (m) => m.VerifikasiPesertaModule
          ),
      },
    ],
  },
];
