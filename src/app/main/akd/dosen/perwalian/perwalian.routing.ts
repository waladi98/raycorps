import { Routes } from "@angular/router";

export const ProfilRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: 'jadwal-mhs-wali',
        loadChildren: () => import('./jadwal-mhs-wali-dosen/jadwal-mhs-wali-dosen.module').then((m) => m.JadwalMhsWaliDosenModule),
      },
      {
        path: 'lihat-profil-mhs-wali',
        loadChildren: () => import('./lihat-profil-mhs-wali/lihat-profil.module').then((m) => m.LihatProfilModule),
      },
      {
        path: 'perwalian',
        loadChildren: () => import('./perwalian/perwalian.module').then((m) => m.PerwalianModule),
      },
      {
        path: 'status-perwalian',
        loadChildren: () => import('./status-perwalian/status-perwalian.module').then((m) => m.StatusPerwalianModule),
      },
    ],
  },
];
