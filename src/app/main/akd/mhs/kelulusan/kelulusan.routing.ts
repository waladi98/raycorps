import { Routes } from "@angular/router";

export const KelulusanRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: 'pembayaran-tugas-akhir',
        loadChildren: () => import('./pembayaran-tugas-akhir/pembayaran-tugas-akhir.module').then((m) => m.PembayaranTAModule),
      },
      {
        path: 'pengajuan-0-sks',
        loadChildren: () => import('./pengajuan-0-sks/pengajuan-0-sks.module').then((m) => m.Pengajuan0SksModule),
      },
    ],
  },
];
