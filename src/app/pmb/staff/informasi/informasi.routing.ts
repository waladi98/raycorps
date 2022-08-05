import { Routes } from '@angular/router';

export const LaporanRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'rekapitulasi-pmb',
        loadChildren: () => import('./rekapitulasi-pmb/rekapitulasi-pmb.module').then((m) => m.RekapitulasiPMBModule),
      },
    ],
  },
];
