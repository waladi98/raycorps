import { Routes } from '@angular/router';

import { PendaftaranOnSiteComponent } from './pendaftaran-on-site.component';
import { TambahPesertaComponent } from './tambah-peserta/tambah-peserta.component';
import { UbahPesertaComponent } from './ubah-peserta/ubah-peserta.component';

export const PendaftaranOnSiteRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: PendaftaranOnSiteComponent
      },
      {
        path: 'ubah-peserta',
        component: UbahPesertaComponent,
      },
      {
        path: 'tambah-peserta',
        component: TambahPesertaComponent,
      },
    ]
  }
];
