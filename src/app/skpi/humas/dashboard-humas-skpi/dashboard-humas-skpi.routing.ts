import { Routes } from '@angular/router';

import { DashboardHumasSkpiComponent } from './dashboard-humas-skpi.component';

export const DashboardHumasSkpiRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: DashboardHumasSkpiComponent
      }
    ]
  }
];
