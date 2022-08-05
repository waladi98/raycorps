import { Routes } from "@angular/router";

export const PerkuliahanRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: 'jadwal-mengajar',
        loadChildren: () => import('./jadwal-mengajar/jadwal-mengajar.module').then((m) => m.JadwalMengajarModule),
      },
      {
        path: 'nilai-perkuliahan',
        loadChildren: () => import('./nilai-perkuliahan/nilai-perkuliahan-dosen.module').then((m) => m.NilaiPerkuliahanDosenModule),
      },
      {
        path: 'jadwal-ujian',
        loadChildren: () => import('./jadwal-ujian/jadwal-ujian.module').then((m) => m.JadwalUjianModule),
      },
      {
        path: 'ujian-daring',
        loadChildren: () => import('./ujian-daring/ujian-daring.module').then((m) => m.UjianDaringModule),
      },
    ],
  },
];
