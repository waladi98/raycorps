import { Routes } from '@angular/router';

import { DashboardPmbPimpinanComponent } from './dashboard-pmb-pimpinan.component';

export const DashboardPmbPimpinanRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: DashboardPmbPimpinanComponent
      }
    ]
  }
];
