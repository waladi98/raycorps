import { Routes } from '@angular/router';

import { PembayaranTAComponent } from './pembayaran-tugas-akhir.component';

export const PembayaranTARoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: PembayaranTAComponent
      },
    ]
  }
];
