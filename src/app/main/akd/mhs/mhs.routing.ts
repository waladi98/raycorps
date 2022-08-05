import { Routes } from "@angular/router";

export const MhsRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: 'profil',
        loadChildren: () => import('./profil/profil.module').then((m) => m.ProfilModule),
      },
      {
        path: 'keuangan',
        loadChildren: () => import('./keuangan/keuangan.module').then((m) => m.KeuanganModule),
      },
      {
        path: 'registrasi',
        loadChildren: () => import('./registrasi/registrasi.module').then((m) => m.RegistrasiModule),
      },
      {
        path: 'jadwal',
        loadChildren: () => import('./jadwal/jadwal.module').then((m) => m.JadwalModule),
      },
      {
        path: 'evaluasi',
        loadChildren: () => import('./evaluasi/evaluasi.module').then((m) => m.EvaluasiModule),
      },
      {
        path: 'kelulusan',
        loadChildren: () => import('./kelulusan/kelulusan.module').then((m) => m.KelulusanModule),
      },
    ],
  },
];
