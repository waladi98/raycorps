import { Routes } from "@angular/router";

export const UjianRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "jadwal-ujian",
        loadChildren: () =>
          import("./jadwal-ujian/jadwal-ujian.module").then(
            (m) => m.JadwalUjianModule
          ),
      },
      {
        path: "surat-pemberitahuan-ujian",
        loadChildren: () =>
          import(
            "./surat-pemberitahuan-ujian/surat-pemberitahuan-ujian.module"
          ).then((m) => m.SuratPemberitahuanUjianModule),
      },
      {
        path: "daftar-hadir-ujian",
        loadChildren: () =>
          import("./daftar-hadir-ujian/daftar-hadir-ujian.module").then(
            (m) => m.DaftarHadirUjianModule
          ),
      },
      {
        path: "kebutuhan-ruang-ujian",
        loadChildren: () =>
          import("./kebutuhan-ruang-ujian/kebutuhan-ruang-ujian.module").then(
            (m) => m.KebutuhanRuangUjianModule
          ),
      },
      {
        path: "surat-hasil-umpan-balik",
        loadChildren: () =>
          import(
            "./surat-hasil-umpan-balik/surat-hasil-umpan-balik.module"
          ).then((m) => m.SuratHasilUmpanBalikModule),
      },
      {
        path: "ujian-susulan",
        loadChildren: () =>
          import("./ujian-susulan/ujian-susulan.module").then(
            (m) => m.UjianSusulanModule
          ),
      },
    ],
  },
];
