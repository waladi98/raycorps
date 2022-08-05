import { Routes } from '@angular/router';

import { MiniProfilComponent } from './mini-profil.component';

export const MiniProfilRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: MiniProfilComponent
      },

    ]
  }
];
