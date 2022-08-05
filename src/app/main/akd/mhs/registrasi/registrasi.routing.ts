import { Routes } from '@angular/router';

export const RegistrasiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'pengisian-krs-mhs',
        loadChildren: () => import('./pengisian-krs-mhs/pengisian-krs.module').then((m) => m.PengisianKRSModule),
      },
      {
        path: 'cetak-nota-dinas',
        loadChildren: () => import('./cetak-nota-dinas/cetak-nota-dinas.module').then((m) => m.CetakNotaDinasModule),
      },
      {
        path: 'kalender-akademik-mhs',
        loadChildren: () => import('./kalender-akademik-mhs/kalender-akademik.module').then((m) => m.KalenderAkademikModule),
      },
      {
        path: 'status-akademik-mhs',
        loadChildren: () => import('./status-akademik-mhs/status-akademik.module').then((m) => m.StatusAkademikModule),
      },
    ],
  },
];
