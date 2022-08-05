import { Routes } from '@angular/router';

import { UbahProfilComponent } from './ubah-profil.component';

export const VerifikasiPesertaRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: UbahProfilComponent
      },
    ]
  }
];
