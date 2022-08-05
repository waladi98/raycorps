import { Routes } from '@angular/router';

import { StatusKegiatanComponent } from './status-kegiatan.component';

export const StatusKegiatanRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: StatusKegiatanComponent,
      },
    ],
  },
];
