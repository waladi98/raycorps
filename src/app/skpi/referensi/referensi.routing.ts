import { Routes } from "@angular/router";

export const ReferensiSKPIRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "jenis-kegiatan",
        loadChildren: () =>
          import("./jenis-kegiatan/jenis-kegiatan.module").then((m) => m.JenisKegiatanModule),
      },  
      {
        path: "partisipasi",
        loadChildren: () =>
          import("./partisipasi/partisipasi.module").then((m) => m.PartisipasiModule),
      },  
      {
        path: "tingkat-kegiatan",
        loadChildren: () =>
          import("./tingkat-kegiatan/tingkat-kegiatan.module").then((m) => m.TingkatKegiatanModule),
      },  
      {
        path: "status-kegiatan",
        loadChildren: () =>
          import("./status-kegiatan/status-kegiatan.module").then((m) => m.StatusKegiatanModule),
      },  
      {
        path: "status-pengusulan",
        loadChildren: () =>
          import("./status-pengusulan/status-pengusulan.module").then((m) => m.StatusPengusulanModule),
      },  
      {
        path: "prodi",
        loadChildren: () =>
          import("./prodi/prodi.module").then((m) => m.ProdiModule),
      },  
    ],
  },
];
 