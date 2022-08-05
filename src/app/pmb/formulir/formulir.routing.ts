import { Routes } from '@angular/router';

import { PmbFormulirComponent } from './formulir.component';

export const FormulirRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: PmbFormulirComponent
      }
    ]
  }
];
