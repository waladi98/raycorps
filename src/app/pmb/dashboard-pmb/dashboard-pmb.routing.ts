import { Routes } from '@angular/router';

import { DashboardPmbComponent } from './dashboard-pmb.component';

export const DashboardPmbRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: DashboardPmbComponent
      }
    ]
  }
];
