import { Routes } from '@angular/router';

import { PengisianKRSComponent } from './pengisian-krs.component';
import { TambahPRSComponent } from './tambah-prs/tambah-prs.component';

export const PengisianKRSRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PengisianKRSComponent,
      },
      {
        path: 'tambah-prs',
        component: TambahPRSComponent,
      },
    ],
  },
];
