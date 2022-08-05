import { Routes } from '@angular/router';

import { PersyaratanPerProdiComponent } from './persyaratan-per-prodi.component';

export const PersyaratanPerProdiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PersyaratanPerProdiComponent,
      },
    ],
  },
];
