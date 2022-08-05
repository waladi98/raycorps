import { Routes } from '@angular/router';

import { DashboardPmbAdmComponent } from './dashboard-pmb-adm.component';

export const DashboardPmbAdmRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: DashboardPmbAdmComponent
      }
    ]
  }
];
