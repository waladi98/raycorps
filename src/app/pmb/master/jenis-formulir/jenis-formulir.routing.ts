import { Routes } from '@angular/router';

import { JenisFormulirComponent } from './jenis-formulir.component';
import { ProdiPilihanDanKomponenNilaiComponent } from './prodi-pilihan-dan-komponen-nilai/prodi-pilihan-dan-komponen-nilai.component';
import { TambahJenisFormulirComponent } from './tambah-jenis-formulir/tambah-jenis-formulir.component';
import { UbahJenisFormulirComponent } from './ubah-jenis-formulir/ubah-jenis-formulir.component';

export const JenisFormulirRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: JenisFormulirComponent,
      },
      {
        path: 'tambah-jenis-formulir',
        component: TambahJenisFormulirComponent,
      },
      {
        path: 'ubah-jenis-formulir',
        component: UbahJenisFormulirComponent,
      },
      {
        path: 'prodi-pilihan-dan-komponen-nilai',
        component: ProdiPilihanDanKomponenNilaiComponent,
      },
    ],
  },
];
