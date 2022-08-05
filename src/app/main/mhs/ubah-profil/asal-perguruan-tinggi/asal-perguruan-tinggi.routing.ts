import { Routes } from '@angular/router';

import { AsalPerguruanTinggiComponent } from './asal-perguruan-tinggi.component';

export const AsalPerguruanTinggiRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: AsalPerguruanTinggiComponent
      },
    ]
  }
];
