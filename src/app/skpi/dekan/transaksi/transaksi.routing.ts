import { Routes } from "@angular/router";

export const TransaksiRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "pengesahan-skpi",
        loadChildren: () =>
          import("./pengesahan-skpi/pengesahan-skpi.module").then((m) => m.PengesahanSKPIModule),
      },  
    ],
  },
];
