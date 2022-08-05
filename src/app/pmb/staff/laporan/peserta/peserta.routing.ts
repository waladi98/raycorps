import { Routes } from '@angular/router';

import { PesertaComponent } from './peserta.component';

export const PesertaRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PesertaComponent,
      },
    ],
  },
];
