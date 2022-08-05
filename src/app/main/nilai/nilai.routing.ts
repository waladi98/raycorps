import { Routes } from '@angular/router';

export const NilaiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'data-akademik-mahasiswa',
        loadChildren: () => import('./data-akademik-mahasiswa/data-akademik-mahasiswa.module').then((m) => m.DataAkademikMahasiswaModule),
      },
      {
        path: 'riwayat-pembayaran-dpp',
        loadChildren: () => import('./riwayat-pembayaran-dpp/riwayat-pembayaran-dpp.module').then((m) => m.RiwayatPembayaranDppModule),
      },
      {
        path: 'penyetaraan-nilai',
        loadChildren: () => import('./penyetaraan-nilai/penyetaraan-nilai.module').then((m) => m.PenyetaraanNilaiModule),
      },
      {
        path: 'pengisian-nilai',
        loadChildren: () => import('./pengisian-nilai/pengisian-nilai.module').then((m) => m.PengisianNilaiModule),
      },
      {
        path: 'koreksi-nilai-mahasiswa',
        loadChildren: () => import('./koreksi-nilai-mahasiswa/koreksi-nilai-mahasiswa.module').then((m) => m.KoreksiNilaiMahasiswaModule),
      },
      {
        path: 'edit-transkrip-nilai',
        loadChildren: () => import('./edit-transkrip-nilai/edit-transkrip-nilai.module').then((m) => m.EditTranskripNilaiModule),
      },
      {
        path: 'kartu-hasil-studi',
        loadChildren: () => import('./kartu-hasil-studi/kartu-hasil-studi.module').then((m) => m.KartuHasilStudiModule),
      },
      {
        path: 'riwayat-nilai',
        loadChildren: () => import('./riwayat-nilai/riwayat-nilai.module').then((m) => m.RiwayatNilaiModule),
      },
      {
        path: 'kartu-kemajuan-studi',
        loadChildren: () => import('./kartu-kemajuan-studi/kartu-kemajuan-studi.module').then((m) => m.KartuKemajuanStudiModule),
      },
      {
        path: 'transkrip-nilai',
        loadChildren: () => import('./transkrip-nilai/transkrip-nilai.module').then((m) => m.TranskripNilaiModule),
      },
      {
        path: 'sebaran-kemajuan-studi',
        loadChildren: () => import('./sebaran-kemajuan-studi/sebaran-kemajuan-studi.module').then((m) => m.SebaranKemajuanStudiModule),
      },
    ],
  },
];
