import { Routes } from '@angular/router';

export const PenyaringanPMBRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'verifikasi-dokumen',
        loadChildren: () => import('./verifikasi-dokumen/verifikasi-dokumen.module').then((m) => m.VerifikasiDokumenModule),
      },
      {
        path: 'verifikasi-kelulusan-dan-nilai',
        loadChildren: () => import('./verifikasi-kelulusan-dan-nilai/verifikasi-kelulusan-dan-nilai.module').then((m) => m.VerifikasiKelulusanDanNilaiModule),
      },
      {
        path: 'verifikasi-registrasi-ulang',
        loadChildren: () => import('./verifikasi-registrasi-ulang/verifikasi-registrasi-ulang.module').then((m) => m.VerifikasiRegistrasiUlangModule),
      },
    ],
  },
];
