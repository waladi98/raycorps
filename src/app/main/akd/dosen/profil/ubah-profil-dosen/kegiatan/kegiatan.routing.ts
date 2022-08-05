import { Routes } from '@angular/router';

import { KegiatanComponent } from './kegiatan.component';

export const DataPribadiRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: KegiatanComponent
      },
    ]
  }
];
