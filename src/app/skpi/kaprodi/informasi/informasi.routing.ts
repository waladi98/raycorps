import { Routes } from "@angular/router";

export const InformasiRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "aturan-sk3",
        loadChildren: () =>
          import("./aturan-sk3/aturan-sk3.module").then((m) => m.AktivitasSK3Module),
      },  
      {
        path: "unduh-skpi",
        loadChildren: () =>
          import("./unduh-skpi/unduh-skpi.module").then((m) => m.UnduhSKPIModule),
      },  
    ],
  },
];
