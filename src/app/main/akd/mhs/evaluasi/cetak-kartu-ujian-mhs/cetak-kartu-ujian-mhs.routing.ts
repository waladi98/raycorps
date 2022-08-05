import { Routes } from '@angular/router';

import { CetakKartuUjianMhsComponent } from './cetak-kartu-ujian-mhs.component';

export const CetakKartuUjianMhsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CetakKartuUjianMhsComponent,
      },
    ],
  },
];
