import { Routes } from "@angular/router";

export const ReferensiRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "pengaturan",
        loadChildren: () =>
          import("./pengaturan/pengaturan.module").then((m) => m.PengaturanModule),
      },
      {
        path: "gelombang",
        loadChildren: () =>
          import("./gelombang/gelombang.module").then((m) => m.GelombangModule),
      },
      {
        path: "jenis-disabilitas",
        loadChildren: () =>
          import("./jenis-disabilitas/jenis-disabilitas.module").then(
            (m) => m.JenisDisabilitasModule
          ),
      },
      {
        path: "jenis-komponen",
        loadChildren: () =>
          import("./jenis-komponen/jenis-komponen.module").then(
            (m) => m.JenisKomponenModule
          ),
      },
      {
        path: "status-dokumen",
        loadChildren: () =>
          import("./status-dokumen/status-dokumen.module").then(
            (m) => m.StatusDokumenModule
          ),
      },
      {
        path: "grade",
        loadChildren: () =>
          import("./grade/grade.module").then((m) => m.GradeModule),
      },
      {
        path: "jas-almamater",
        loadChildren: () =>
          import("./jas-almamater/jas-almamater.module").then(
            (m) => m.JasAlmamaterModule
          ),
      },
      {
        path: "jenis-mgm",
        loadChildren: () =>
          import("./jenis-mgm/jenis-mgm.module").then((m) => m.JenisMGMModule),
      },
      {
        path: "status-seleksi",
        loadChildren: () =>
          import("./status-seleksi/status-seleksi.module").then(
            (m) => m.StatusSeleksiModule
          ),
      },
      {
        path: "jenis-mgm",
        loadChildren: () =>
          import("./status-seleksi/status-seleksi.module").then(
            (m) => m.StatusSeleksiModule
          ),
      },
      
    ],
  },
];
