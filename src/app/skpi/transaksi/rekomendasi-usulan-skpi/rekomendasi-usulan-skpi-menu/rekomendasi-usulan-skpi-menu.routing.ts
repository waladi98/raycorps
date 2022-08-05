import { Routes } from '@angular/router';

import { MenuRekomendasiUsulanSKPIComponent } from './rekomendasi-usulan-skpi-menu.component';

export const RekomendasiUsulanSKPIRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: MenuRekomendasiUsulanSKPIComponent
      },

    ]
  }
];
