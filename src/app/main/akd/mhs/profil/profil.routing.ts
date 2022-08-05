import { Routes } from "@angular/router";

export const ProfilRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: 'lihat-profil-mhs',
        loadChildren: () => import('./lihat-profil-mhs/lihat-profil.module').then((m) => m.LihatProfilModule),
      },
      {
        path: 'ubah-profil-mhs',
        loadChildren: () => import('./ubah-profil-mhs/ubah-profil.module').then((m) => m.UbahProfilModule),
      },
    ],
  },
];
