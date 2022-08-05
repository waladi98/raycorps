import { Routes } from '@angular/router';

import { AturanPenilaianComponent } from './aturan-penilaian-sk3.component';

export const AturanPenilaianRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AturanPenilaianComponent,
      },
    ],
  },
];
