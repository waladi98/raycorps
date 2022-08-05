import { Routes } from "@angular/router";

export const GenerateNpmRoutes: Routes = [
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
        path: "verifikasi-nilai-peserta",
        loadChildren: () =>
          import(
            "./verifikasi-nilai-peserta/verifikasi-nilai-peserta.module"
          ).then((m) => m.VerifikasiNilaiPesertaModule),
      },
    ],
  },
];
