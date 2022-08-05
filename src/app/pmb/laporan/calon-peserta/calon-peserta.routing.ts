import { Routes } from '@angular/router';

import { CalonPesertaComponent } from './calon-peserta.component';

export const CalonPesertaRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CalonPesertaComponent,
      },
    ],
  },
];
