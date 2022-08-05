import { Routes } from '@angular/router';

import { KomponenNilaiDanSeleksiComponent } from './komponen-nilai-dan-seleksi.component';
import { DetailKomponenNilaiComponent } from './detail-komponen-nilai/detail-komponen-nilai.component';
import { TambahDataComponent } from "./tambah-data/tambah-data.component";
export const KomponenNilaiDanSeleksiRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: KomponenNilaiDanSeleksiComponent
      },
      {
        path: 'detail-komponen-nilai',
        component: DetailKomponenNilaiComponent
      },
      {
        path: 'tambah-data',
        component: TambahDataComponent
      }
    ]
  }
];
