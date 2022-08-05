import { Routes } from '@angular/router';

import { DashboardPmbPublicComponent } from './dashboard-pmb-public.component';

export const DashboardPmbPublicRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: DashboardPmbPublicComponent
      }
    ]
  }
];
