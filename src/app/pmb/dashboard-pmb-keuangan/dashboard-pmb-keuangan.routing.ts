import { Routes } from '@angular/router';

import { DashboardPmbKeuanganComponent } from './dashboard-pmb-keuangan.component';

export const DashboardPmbKeuanganRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: DashboardPmbKeuanganComponent
      }
    ]
  }
];
