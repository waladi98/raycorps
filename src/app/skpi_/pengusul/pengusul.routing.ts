import { Routes } from "@angular/router";
import { PmbBayarGuard } from "../../core/auth/guards/pmb-bayar.guard";
import { PmbLulusGuard } from "../../core/auth/guards/pmb-lulus.guard";
import { PmbChildGuard } from "../../core/auth/guards/pmb-child.guard";

export const PengusulRoutes: Routes = [
  {
    path: "",
    children: [
      
      {
         path: "aktivitas-sk",
        canActivate: [],
        loadChildren: () =>
        import("./aktivitas-sk/aktivitas-sk.module").then(
        (m) => m.AktivitasSKModule
        ),
      },
    ],
  },
];
