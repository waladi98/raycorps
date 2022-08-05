import { Routes } from '@angular/router';

import { ProdiComponent } from './prodi.component';

export const ProdiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProdiComponent,
      },
    ],
  },
];
