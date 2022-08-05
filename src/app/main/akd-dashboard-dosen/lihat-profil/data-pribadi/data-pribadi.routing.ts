import { Routes } from '@angular/router';

import { DataPribadiComponent } from './data-pribadi.component';

export const DataPribadiRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: DataPribadiComponent
      },
    ]
  }
];
