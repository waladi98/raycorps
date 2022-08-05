import { Routes } from "@angular/router";

export const TransaksiRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "aktivitas-sk3",
        loadChildren: () =>
          import("./aktivitas-sk3/aktivitas-sk3.module").then((m) => m.AktivitasSK3Module),
      },  
      {
        path: "usulan-skpi",
        loadChildren: () =>
          import("./usulan-skpi/usulan-skpi.module").then((m) => m.UsulanSKPIModule),
      },  
    ],
  },
];
