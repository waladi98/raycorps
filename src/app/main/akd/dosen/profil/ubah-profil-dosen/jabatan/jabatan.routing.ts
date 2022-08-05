import { Routes } from '@angular/router';

import { JabatanComponent } from './jabatan.component';

export const JabatanRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: JabatanComponent
      },
    ]
  }
];
