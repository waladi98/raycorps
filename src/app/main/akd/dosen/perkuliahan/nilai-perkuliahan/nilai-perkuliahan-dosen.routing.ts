import { Routes } from '@angular/router';

import { NilaiPerkuliahanDosenComponent } from './nilai-perkuliahan-dosen.component';

export const NilaiPerkuliahanDosenRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: NilaiPerkuliahanDosenComponent,
      },
    ],
  },
];
