import { Routes } from '@angular/router';

import { KomponenPerJenisFormulirComponent } from './komponen-per-jenis-formulir.component';

export const KomponenPerJenisFormulirRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: KomponenPerJenisFormulirComponent,
      },
    ],
  },
];
