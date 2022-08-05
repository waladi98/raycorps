import { Routes } from "@angular/router";

export const MasterPMBRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "verifikator-prodi",
        loadChildren: () =>
          import("./verifikator-prodi/verifikator-prodi.module").then((m) => m.VerifikatorProdiModule),
      },
      {
        path: "aturan-sk3",
        loadChildren: () =>
          import("./aturan-sk3/aturan-sk3.module").then((m) => m.AturanSK3Module),
      },
      {
        path: "pengelolaan-aturan-sk3",
        loadChildren: () =>
          import("./pengelolaan-aturan-sk3/pengelolaan-aturan-sk3.module").then((m) => m.PengelolaanAturanSK3Module),
      },  
      {
        path: "kegiatan-wajib",
        loadChildren: () =>
          import("./kegiatan-wajib/kegiatan-wajib.module").then((m) => m.KegiatanWajibModule),
      },  
      {
        path: "kegiatan-wajib-prodi",
        loadChildren: () =>
          import("./kegiatan-wajib-prodi/kegiatan-wajib-prodi.module").then((m) => m.KegiatanWajibProdiModule),
      },  
      {
        path: "kegiatan-tingkat",
        loadChildren: () =>
          import("./kegiatan-tingkat/kegiatan-tingkat.module").then((m) => m.KegiatanTingkatModule),
      },  
      {
        path: "staff-verifikasi",
        loadChildren: () =>
          import("./staff-verifikasi/staff-verifikasi.module").then((m) => m.StaffVerifikasiModule),
      },  
    ],
  },
];
