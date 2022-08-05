import { Routes } from '@angular/router';

import { OrangTuaComponent } from './orang-tua.component';

export const OrangTuaRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: OrangTuaComponent
      },
    ]
  }
];
