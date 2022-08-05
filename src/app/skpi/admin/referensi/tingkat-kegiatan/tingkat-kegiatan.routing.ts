import { Routes } from '@angular/router';

import { TingkatKegiatanComponent } from './tingkat-kegiatan.component';

export const TingkatKegiatanRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TingkatKegiatanComponent,
      },
    ],
  },
];
