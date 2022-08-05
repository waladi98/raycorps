import { Routes } from '@angular/router';

export const JadwalRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'jadwal-perkuliahan',
        loadChildren: () => import('./jadwal-perkuliahan-mhs/jadwal-perkuliahan-mhs.module').then((m) => m.JadwalPerkuliahanMhsModule),
      },
      {
        path: 'jadwal-kuliah',
        loadChildren: () => import('./jadwal-kuliah-mhs/jadwal-kuliah-mhs.module').then((m) => m.JadwalKuliahMhsModule),
      },
      {
        path: 'jadwal-praktikum',
        loadChildren: () => import('./jadwal-praktikum-mhs/jadwal-praktikum-mhs.module').then((m) => m.JadwalPraktikumMhsModule),
      },
    ],
  },
];
