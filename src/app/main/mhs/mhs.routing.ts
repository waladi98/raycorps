import { Routes } from '@angular/router';

export const MhsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'ubah-profile',
        loadChildren: () => import('./ubah-profil/ubah-profil.module').then((m) => m.UbahProfilModule),
      },
      {
        path: 'lihat-profile',
        loadChildren: () => import('./lihat-profil/lihat-profil.module').then((m) => m.LihatProfilModule),
      },
      {
        path: 'pengisian-krs',
        loadChildren: () => import('./pengisian-krs/pengisian-krs.module').then((m) => m.PengisianKRSModule),
      },
      {
        path: 'status-akademik',
        loadChildren: () => import('./status-akademik/status-akademik.module').then((m) => m.StatusAkademikModule),
      },
      {
        path: 'kuisioner',
        loadChildren: () => import('./kuisioner/kuisioner.module').then((m) => m.KuisionerModule),
      },
      {
        path: 'kalender-akademik',
        loadChildren: () => import('./kalender-akademik/kalender-akademik.module').then((m) => m.KalenderAkademikModule),
      }
    ],
  },
];
