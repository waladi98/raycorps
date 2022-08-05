import { Routes } from '@angular/router';
import { UbahUnggahKelengkapanComponent } from './aktivitas-sk3/ubah-unggah-kelengkapan.component';
import { UnggahKelengkapanComponent } from './aktivitas-sk.component';

export const AktivitasSKRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: UnggahKelengkapanComponent
      },
      {
        path: 'ubah',
        component: UbahUnggahKelengkapanComponent
      }
    ]
  }
];
