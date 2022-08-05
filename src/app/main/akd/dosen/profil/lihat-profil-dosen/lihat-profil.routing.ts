import { Routes } from '@angular/router';

import { LihatProfilComponent } from './lihat-profil.component';

export const VerifikasiPesertaRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: LihatProfilComponent
      },
    ]
  }
];
