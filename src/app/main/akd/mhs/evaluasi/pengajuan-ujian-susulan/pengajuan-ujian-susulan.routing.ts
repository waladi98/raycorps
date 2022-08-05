import { Routes } from '@angular/router';

import { PengajuanUjianSusulanComponent } from './pengajuan-ujian-susulan.component';

export const PengajuanUjianSusulanRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PengajuanUjianSusulanComponent,
      },
    ],
  },
];
