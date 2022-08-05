import { Routes } from '@angular/router';

import { DaftarPeriksaComponent } from './daftar-periksa-audit.component';
import { DetailKomponenNilaiComponent } from './detail-komponen-nilai/detail-komponen-nilai.component';
import { TambahDataComponent } from "./tambah-data/tambah-data.component";
export const ButirPenilaianRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: DaftarPeriksaComponent
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
