import { Routes } from '@angular/router';

import { Pengajuan0SksComponent } from './pengajuan-0-sks.component';

export const Pengajuan0SksRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: Pengajuan0SksComponent
      },
    ]
  }
];
