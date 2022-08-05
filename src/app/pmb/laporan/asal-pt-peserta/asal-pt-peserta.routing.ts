import { Routes } from '@angular/router';

import { AsalPTPesertaComponent } from './asal-pt-peserta.component';

export const AsalPTPesertaRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AsalPTPesertaComponent,
      },
    ],
  },
];
