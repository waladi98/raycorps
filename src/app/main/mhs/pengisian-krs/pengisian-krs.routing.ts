import { Routes } from '@angular/router';

import { PengisianKRSComponent } from './pengisian-krs.component';

export const PengisianKRSRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PengisianKRSComponent,
      },
    ],
  },
];
