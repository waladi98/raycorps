import { Routes } from "@angular/router";

export const MasterDataRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "institusi",
        loadChildren: () =>
          import("./institusi/institusi.module").then((m) => m.InstitusiModule),
      },
      {
        path: "kampus",
        loadChildren: () =>
          import("./kampus/kampus.module").then((m) => m.KampusModule),
      },
      {
        path: "ruang",
        loadChildren: () =>
          import("./ruang/ruang.module").then((m) => m.RuangModule),
      },
      {
        path: "program",
        loadChildren: () =>
          import("./program/program.module").then((m) => m.ProgramModule),
      },
      {
        path: "fakultas_dan_program_studi",
        loadChildren: () =>
          import("./fakultas-program-studi/fakultas-program-studi.module").then(
            (m) => m.FakultasProgramStudiModule
          ),
      },
      {
        path: "tahun_akademik",
        loadChildren: () =>
          import("./tahun-akademik/tahun-akademik.module").then(
            (m) => m.TahunAkademikModule
          ),
      },
      {
        path: "dosen",
        loadChildren: () =>
          import("./dosen/dosen.module").then((m) => m.DosenModule),
      },
      {
        path: "kurikulum_mata_kuliah",
        loadChildren: () =>
          import("./kurikulum-mata-kuliah/kurikulum-mata-kuliah.module").then(
            (m) => m.KurikulumMataKuliahModule
          ),
      },
      {
        path: "pengguna",
        loadChildren: () =>
          import("./pengguna/pengguna.module").then((m) => m.PenggunaModule),
      },
      {
        path: "pimpinan",
        loadChildren: () =>
          import("./pimpinan/pimpinan.module").then((m) => m.PimpinanModule),
      },
      {
        path: "mahasiswa",
        loadChildren: () =>
          import("./mahasiswa/mahasiswa.module").then((m) => m.MahasiswaModule),
      },
    ],
  },
];
