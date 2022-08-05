import { Routes } from "@angular/router";

export const ProfilRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: 'lihat-profil-dosen',
        loadChildren: () => import('./lihat-profil-dosen/lihat-profil.module').then((m) => m.LihatProfilModule),
      },
      {
        path: 'ubah-profil-dosen',
        loadChildren: () => import('./ubah-profil-dosen/ubah-profil.module').then((m) => m.UbahProfilModule),
      },
    ],
  },
];
