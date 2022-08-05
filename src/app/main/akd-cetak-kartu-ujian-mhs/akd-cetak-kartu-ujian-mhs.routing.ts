import { Routes } from '@angular/router';

import { AkdCetakKartuUjianMhsComponent } from './akd-cetak-kartu-ujian-mhs.component';

export const AkdCetakKartuUjianMhsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AkdCetakKartuUjianMhsComponent,
      },
    ],
  },
];
