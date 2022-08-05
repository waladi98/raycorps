import { Routes } from "@angular/router";

export const LaporanRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "pendaftaran-online",
        loadChildren: () =>
          import("./pendaftaran-on-site/pendaftaran-on-site.module").then(
            (m) => m.PendaftaranOnSiteModule
          ),
      },
      {
        path: "penjualan-formulir",
        loadChildren: () =>
          import(
            "./verifikasi-cadangan/verifikasi-kelulusan-dan-nilai.module"
          ).then((m) => m.VerifikasiKelulusanDanNilaiModule),
      },
      {
        path: "proses-bukti-bayar",
        loadChildren: () =>
          import("./proses-bukti-bayar/proses-bukti-bayar.module").then(
            (m) => m.ProsesBuktiBayarModule
          ),
      },
      {
        path: "peserta",
        loadChildren: () =>
          import("./peserta/peserta.module").then((m) => m.PesertaModule),
      },
      {
        path: "asal-sekolah",
        loadChildren: () =>
          import(
            "./verifikasi-cadangan/verifikasi-kelulusan-dan-nilai.module"
          ).then((m) => m.VerifikasiKelulusanDanNilaiModule),
      },
      {
        path: "asal-pt",
        loadChildren: () =>
          import(
            "./verifikasi-cadangan/verifikasi-kelulusan-dan-nilai.module"
          ).then((m) => m.VerifikasiKelulusanDanNilaiModule),
      },
      {
        path: "proses-persyaratan",
        loadChildren: () =>
          import("./verifikasi-dokumen/verifikasi-dokumen.module").then(
            (m) => m.VerifikasiDokumenModule
          ),
      },
      {
        path: "verifikasi-nilai",
        loadChildren: () =>
          import(
            "./verifikasi-cadangan/verifikasi-kelulusan-dan-nilai.module"
          ).then((m) => m.VerifikasiKelulusanDanNilaiModule),
      },

      {
        path: "proses-kelulusan",
        loadChildren: () =>
          import(
            "./verifikasi-kelulusan-dan-nilai/verifikasi-kelulusan-dan-nilai.module"
          ).then((m) => m.VerifikasiKelulusanDanNilaiModule),
      },
      {
        path: "proses-cadangan",
        loadChildren: () =>
          import(
            "./verifikasi-kelulusan-cadangan/verifikasi-kelulusan-cadangan.module"
          ).then((m) => m.VerifikasiKelulusanCadanganModule),
      },
      {
        path: "proses-kelengkapan",
        loadChildren: () =>
          import("./verifikasi-kelengkapan/verifikasi-kelengkapan.module").then(
            (m) => m.VerifikasiKelengkapanModule
          ),
      },
      {
        path: "proses-registrasi",
        loadChildren: () =>
          import("./generate-npm/generate-npm.module").then(
            (m) => m.GenerateNpmModule
          ),
      },
      {
        path: "proses-pengunduran-diri",
        loadChildren: () =>
          import("./peserta-undur-diri/peserta-undur-diri.module").then(
            (m) => m.PesertaUndurDiriModule
          ),
      },
      {
        path: "generate-npm",
        loadChildren: () =>
          import("./generate-npm/generate-npm.module").then(
            (m) => m.GenerateNpmModule
          ),
      },
      {
        path: "unggah-sertifikat-psikotes",
        loadChildren: () =>
          import(
            "./unggah-sertifikat-psikotes/unggah-sertifikat-psikotes.module"
          ).then((m) => m.UnggahSertifikatPsikotesRoutesModule),
      },
    ],
  },
];
