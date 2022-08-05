import { Routes } from '@angular/router';
import { PmbChildGuard } from '../core/auth/guards/pmb-child.guard';
import { SmartGuard } from '../core/auth/guards/smart.guard';
import { PmbHomeGuard } from '../core/auth/guards/pmb-home.guard';
export const FeederRoutes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        canActivate: [],
        loadChildren: () =>
          import("./dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'frame/:modul',
        canActivate: [],
        loadChildren: () => import('../pmb/frame/frame.module').then((m) => m.FrameModule),
      },
      {
        path: "transaksi/akademik-mahasiswa",
        canActivate: [],
        loadChildren: () =>
          import("./akademik-mahasiswa/akademik-mahasiswa.module").then((m) => m.AkademikMahasiswaModule),
      },
    ],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        canActivate: [SmartGuard],
        loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
      },
    ],
  },
];
