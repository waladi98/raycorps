import { Routes } from '@angular/router';

export const EvaluasiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'kuesioner-mhs',
        loadChildren: () => import('./kuesioner-mhs/kuesioner-mhs.module').then((m) => m.KuesionerModule),
      },
      {
        path: 'cetak-kartu-ujian',
        loadChildren: () => import('./cetak-kartu-ujian-mhs/cetak-kartu-ujian-mhs.module').then((m) => m.CetakKartuUjianMhsModule),
      },
      {
        path: 'nilai',
        loadChildren: () => import('./nilai/nilai.module').then((m) => m.NilaiModule),
      },
      {
        path: 'ujian-susulan-daring',
        loadChildren: () => import('./ujian-susulan-daring/ujian-susulan-daring.module').then((m) => m.UjianSusulanDaringModule),
      },
      {
        path: 'pengajuan-ujian-susulan',
        loadChildren: () => import('./pengajuan-ujian-susulan/pengajuan-ujian-susulan.module').then((m) => m.PengajuanUjianSusulanModule),
      },
    ],
  },
];
