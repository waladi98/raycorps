import { Routes } from "@angular/router";

export const PesertaRoutes: Routes = [
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
        path: "verifikasi-kelulusan-peserta/:formulir_id",
        loadChildren: () =>
          import(
            "./verifikasi-kelulusan-peserta/verifikasi-kelulusan-peserta.module"
          ).then((m) => m.VerifikasiKelulusanPesertaModule),
      },
      {
        path: "detail-peserta/:formulir_id",
        loadChildren: () =>
          import("./detail-peserta/detail-peserta.module").then(
            (m) => m.DetailPesertaModule
          ),
      },
    ],
  },
];
