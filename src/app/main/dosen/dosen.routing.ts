import { Routes } from "@angular/router";

export const MhsRoutes: Routes = [
  {
    path: "",
    children: [
      // {
      //    path: 'ubah-profil',
      //    loadChildren: () => import('./ubah-profil/ubah-profil.module').then((m) => m.UbahProfilModule),
      // },
      {
        path: 'nilai-perkuliahan',
        loadChildren: () => import('./nilai-perkuliahan/nilai-perkuliahan-dosen.module').then((m) => m.NilaiPerkuliahanDosenModule),
      },
      {
        path: 'status-perwalian',
        loadChildren: () => import('./status-perwalian/status-perwalian.module').then((m) => m.StatusPerwalianModule),
      },
      {
        path: 'perwalian',
        loadChildren: () => import('./perwalian/perwalian.module').then((m) => m.PerwalianModule),
      },
    ],
  },
];
