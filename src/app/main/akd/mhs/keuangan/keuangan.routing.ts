import { Routes } from "@angular/router";

export const KeuanganRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: 'dispensasi-keuangan-mhs',
        loadChildren: () => import('./dispensasi-keuangan-mhs/dispensasi-keuangan-mhs.module').then((m) => m.DispensasiKeuanganMhsModule),
      },
      {
        path: 'dispensasi-ujian-mhs',
        loadChildren: () => import('./dispensasi-ujian-mhs/dispensasi-ujian-mhs.module').then((m) => m.DispensasiUjianMhsModule),
      },
    ],
  },
];
