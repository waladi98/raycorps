import { Routes } from "@angular/router";

export const VerifikasiNilaiRoutes: Routes = [
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
        path: "informasi-lengkap-peserta",
        loadChildren: () =>
          import(
            "./informasi-lengkap-peserta/informasi-lengkap-peserta.module"
          ).then((m) => m.InformasiLengkapPesertaModule),
      },
      {
        path: "verifikasi-nilai-peserta/:formulir_id",
        loadChildren: () =>
          import(
            "./verifikasi-nilai-peserta/verifikasi-nilai-peserta.module"
          ).then((m) => m.VerifikasiNilaiPesertaModule),
      },
    ],
  },
];
