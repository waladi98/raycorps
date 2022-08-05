import { Routes } from '@angular/router';

export const TransaksiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'pendaftaran-on-site',
        loadChildren: () => import('./pendaftaran-on-site/pendaftaran-on-site.module').then((m) => m.PendaftaranOnSiteModule),
      },
      {
        path: 'proses-bukti-bayar',
        loadChildren: () => import('./proses-bukti-bayar/proses-bukti-bayar.module').then((m) => m.ProsesBuktiBayarModule),
      },
    ],
  },
];
