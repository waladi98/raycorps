import { Routes } from "@angular/router";

export const MasterRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "pengelolaan-aturan-sk3",
        loadChildren: () =>
          import("./pengelolaan-aturan-sk3/pengelolaan-aturan-sk3.module").then((m) => m.PengelolaanAturanSK3Module),
      },  
      {
        path: "kegiatan-sk3",
        loadChildren: () =>
          import("./kegiatan-sk3/kegiatan-sk3.module").then((m) => m.KegiatanSK3Module),
      },  
      {
        path: "kegiatan-tingkat",
        loadChildren: () =>
          import("./kegiatan-tingkat/kegiatan-tingkat.module").then((m) => m.KegiatanTingkatModule),
      },  
    ],
  },
];
