import { Routes } from '@angular/router';

export const AkdDashboardDosenRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'lihat-profil',
        loadChildren: () => import('./lihat-profil/lihat-profil.module').then((m) => m.LihatProfilModule),
      },
    ],
  },
];
