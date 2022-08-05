import { Routes } from '@angular/router';

import { KelengkapanPerProdiComponent } from './kelengkapan-per-prodi.component';

export const KelengkapanPerProdiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: KelengkapanPerProdiComponent,
      },
    ],
  },
];
