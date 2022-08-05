import { Routes } from '@angular/router';

import { PengesahanSKPIComponent } from './pengesahan-skpi.component';

export const PersyaratanPerProdiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PengesahanSKPIComponent,
      },
    ],
  },
];
