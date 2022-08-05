import { Routes } from '@angular/router';

import { BankComponent } from './bank.component';

export const BankRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: BankComponent
      },
    ]
  }
];
