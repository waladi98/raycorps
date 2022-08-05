import { Routes } from "@angular/router";

export const InformasiRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "detail-sk3-mahasiswa",
        loadChildren: () =>
          import("./detail-sk3-mahasiswa/detail-sk3-mahasiswa.module").then((m) => m.DetailSK3MahasiswaModule),
      },  
      {
        path: "detail-skpi",
        loadChildren: () =>
          import("./detail-skpi/detail-skpi.module").then((m) => m.DetailSKPIModule),
      },  
      {
        path: "log-sinkronasi",
        loadChildren: () =>
          import("./log-sinkronasi-pelaporan-simkatmawa/log-sinkronasi-pelaporan-simkatmawa.module").then((m) => m.LogSinkronasiModule),
      },  
    ],
  },
];
