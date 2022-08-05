import { Routes } from '@angular/router';

import { RekomendasiUsulanSKPIComponent } from './rekomendasi-usulan-skpi.component';
import { MenuRekomendasiUsulanSKPIComponent } from './rekomendasi-usulan-skpi-menu/rekomendasi-usulan-skpi-menu.component';

export const RekomendasiUsulanSKPIRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: RekomendasiUsulanSKPIComponent,
      },
      {
        path: 'menu',
        component: MenuRekomendasiUsulanSKPIComponent,
      },
    ],
  },
];
