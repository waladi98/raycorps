import { Routes } from '@angular/router';

import { KuisionerComponent } from './kuisioner.component';

export const KuisionerRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: KuisionerComponent,
      },
    ],
  },
];
