import { Routes } from "@angular/router";

export const PenyaringanPMBRoutes: Routes = [
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
        path: "verifikasi-reg-ulang",
        loadChildren: () =>
          import("./verifikasi-reg-ulang/verifikasi-reg-ulang.module").then(
            (m) => m.VerifikasiRegUlangModule
          ),
      },
    ],
  },
];
