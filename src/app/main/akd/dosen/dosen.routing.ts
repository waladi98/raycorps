import { Routes } from "@angular/router";

export const DosenRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: 'profil',
        loadChildren: () => import('./profil/profil.module').then((m) => m.ProfilModule),
      },
      {
        path: 'perwalian',
        loadChildren: () => import('./perwalian/perwalian.module').then((m) => m.PerwalianModule),
      },
      {
        path: 'perkuliahan',
        loadChildren: () => import('./perkuliahan/perkuliahan.module').then((m) => m.PerkuliahanModule),
      },
    ],
  },
];
