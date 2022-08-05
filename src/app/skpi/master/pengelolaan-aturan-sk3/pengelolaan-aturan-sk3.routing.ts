import { Routes } from '@angular/router';

import { PengelolaanAturanSK3Component } from './pengelolaan-aturan-sk3.component';

export const PengelolaanAturanSK3Routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PengelolaanAturanSK3Component,
      },
    ],
  },
];
