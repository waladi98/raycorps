import { Routes } from '@angular/router';

import { VerifikasiLaporanMahasiswaComponent } from './verifikasi-laporan-mahasiswa.component';

export const PersyaratanPerProdiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: VerifikasiLaporanMahasiswaComponent,
      },
    ],
  },
];
