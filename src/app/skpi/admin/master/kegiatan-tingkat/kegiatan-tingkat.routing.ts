import { Routes } from '@angular/router';

import { KegiatanTingkatComponent } from './kegiatan-tingkat.component';

export const KegiatanTingkatRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: KegiatanTingkatComponent,
      },
    ],
  },
];
