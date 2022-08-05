import { Routes } from '@angular/router';

import { DataAkademikComponent } from './data-akademik.component';

export const DataPribadiRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: DataAkademikComponent
      },
    ]
  }
];
