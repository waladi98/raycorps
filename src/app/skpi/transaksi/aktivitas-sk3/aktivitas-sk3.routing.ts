import { Routes } from '@angular/router';

import { AktivitasSK3Component } from './aktivitas-sk3.component';

export const AktivitasSK3Routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AktivitasSK3Component,
      },
    ],
  },
];
