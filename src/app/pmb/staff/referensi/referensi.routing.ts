import { Routes } from "@angular/router";

export const ReferensiRoutes: Routes = [
  {
    path: "",
    children: [
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
        path: "status-seleksi",
        loadChildren: () =>
          import("./status-seleksi/status-seleksi.module").then(
            (m) => m.StatusSeleksiModule
          ),
      },
      {
        path: "grade",
        loadChildren: () =>
          import("./grade/grade.module").then((m) => m.GradeModule),
      },
    ],
  },
];
