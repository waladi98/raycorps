import { Routes } from '@angular/router';

import { IsiFormulirPmbComponent } from './isi-formulir-pmb.component';

export const IsiFormulirPmbRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: IsiFormulirPmbComponent
      }
    ]
  }
];
