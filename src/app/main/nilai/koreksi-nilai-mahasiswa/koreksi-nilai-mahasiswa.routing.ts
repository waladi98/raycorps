import { Routes } from '@angular/router';

import { KoreksiNilaiMahasiswaComponent } from './koreksi-nilai-mahasiswa.component';
import { ManageKoreksiNilaiMahasiswaComponent } from './manage-koreksi-nilai-mahasiswa/manage-koreksi-nilai-mahasiswa.component';

export const KoreksiNilaiMahasiswaRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: KoreksiNilaiMahasiswaComponent,
      },
      {
        path: 'manage-koreksi-nilai-mahasiswa/:id',
        data: { recTitle: 'Update Data KoreksiNilaiMahasiswa' },
        component: ManageKoreksiNilaiMahasiswaComponent,
      },
      {
        path: 'manage-koreksi-nilai-mahasiswa',
        data: { recTitle: 'Tambah Data KoreksiNilaiMahasiswa' },
        component: ManageKoreksiNilaiMahasiswaComponent,
      },
    ],
  },
];
