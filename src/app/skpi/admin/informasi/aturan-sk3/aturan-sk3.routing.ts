import { Routes } from '@angular/router';

import { AturanSK3Component } from './aturan-sk3.component';

export const AturanSK3Routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AturanSK3Component,
      },
    ],
  },
];
