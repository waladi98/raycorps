import { Routes } from '@angular/router';

import { MenuVerifikasiUsulanSKPIComponent } from './verifikasi-usulan-skpi-menu.component';

export const MenuVerifikasiUsulanSKPIRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: MenuVerifikasiUsulanSKPIComponent
      },

    ]
  }
];
