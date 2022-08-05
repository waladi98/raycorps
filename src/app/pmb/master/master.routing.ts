import { Routes } from "@angular/router";

export const MasterPMBRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "gelombang",
        loadChildren: () =>
          import("./gelombang/gelombang.module").then((m) => m.GelombangModule),
      },
      {
        path: "komponen-tes-dan-seleksi",
        loadChildren: () =>
          import(
            "./komponen-nilai-dan-seleksi/komponen-nilai-dan-seleksi.module"
          ).then((m) => m.KomponenNilaiDanSeleksiModule),
      },
      {
        path: "jenis-formulir",
        loadChildren: () =>
          import("./jenis-formulir/jenis-formulir.module").then(
            (m) => m.JenisFormulirModule
          ),
      },

      {
        path: "persyaratan",
        loadChildren: () =>
          import("./persyaratan/persyaratan.module").then(
            (m) => m.PersyaratanModule
          ),
      },
      {
        path: "kelengkapan",
        loadChildren: () =>
          import("./kelengkapan/kelengkapan.module").then(
            (m) => m.KelengkapanModule
          ),
      },
      {
        path: "nilai-jenis-form",
        loadChildren: () =>
          import("./nilai-jenis-formulir/nilai-jenis-formulir.module").then(
            (m) => m.NilaiJenisFormulirModule
          ),
      },
      {
        path: "nilai-jenis-jurusan-sekolah",
        loadChildren: () =>
          import(
            "./nilai-jenis-jurusan-sekolah/nilai-jenis-jurusan-sekolah.module"
          ).then((m) => m.NilaiJenisJurusanSekolahModule),
      },
      {
        path: "mgm",
        loadChildren: () =>
          import("./member-get-member/member-get-member.module").then(
            (m) => m.MemberGetMemberModule
          ),
      },
      {
        path: "guru",
        loadChildren: () =>
          import("./guru/guru.module").then((m) => m.GuruModule),
      },
      {
        path: "sekolah",
        loadChildren: () =>
          import("./sekolah/sekolah.module").then((m) => m.SekolahModule),
      },
      {
        path: "civitas",
        loadChildren: () =>
          import("./kelengkapan/kelengkapan.module").then(
            (m) => m.KelengkapanModule
          ),
      },
    ],
  },
];
