import { Routes } from '@angular/router';

export const LaporanRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'calon-pendaftar',
        loadChildren: () => import('./calon-pendaftar/calon-pendaftar.module').then((m) => m.CalonPendaftarModule),
      },
      {
        path: 'calon-pendaftar-batal',
        loadChildren: () => import('./calon-pendaftar-batal/calon-pendaftar-batal.module').then((m) => m.CalonPendaftarBatalModule),
      },
      {
        path: 'pendaftar',
        loadChildren: () => import('./pendaftar/pendaftar.module').then((m) => m.PendaftarModule),
      },
      {
        path: 'calon-peserta',
        loadChildren: () => import('./calon-peserta/calon-peserta.module').then((m) => m.CalonPesertaModule),
      },
      {
        path: 'calon-mahasiswa',
        loadChildren: () => import('./calon-mahasiswa/calon-mahasiswa.module').then((m) => m.CalonMahasiswaModule),
      },
      {
        path: 'mahasiswa-baru',
        loadChildren: () => import('./mahasiswa-baru/mahasiswa-baru.module').then((m) => m.MahasiswaBaruModule),
      },
      {
        path: 'virtual-account',
        loadChildren: () => import('./virtual-account/virtual-account.module').then((m) => m.VirtualAccountModule),
      },
      {
        path: 'virtual-account-registrasi-camaba',
        loadChildren: () => import('./virtual-account-registrasi-camaba/virtual-account-registrasi-camaba.module').then((m) => m.VirtualAccountRegistrasiCamabaModule),
      },
      {
        path: 'peserta',
        loadChildren: () => import('./peserta/peserta.module').then((m) => m.PesertaModule),
      },
      {
        path: 'komponen-per-jenis-formulir',
        loadChildren: () => import('./komponen-per-jenis-formulir/komponen-per-jenis-formulir.module').then((m) => m.KomponenPerJenisFormulirModule),
      },
      {
        path: 'komponen-per-jurusan-sekolah',
        loadChildren: () => import('./komponen-per-jurusan-sekolah/komponen-per-jurusan-sekolah.module').then((m) => m.KomponenPerJurusanSekolahModule),
      },
      {
        path: 'persyaratan-per-prodi',
        loadChildren: () => import('./persyaratan-per-prodi/persyaratan-per-prodi.module').then((m) => m.PersyaratanPerProdiModule),
      },
      {
        path: 'kelengkapan-per-prodi',
        loadChildren: () => import('./kelengkapan-per-prodi/kelengkapan-per-prodi.module').then((m) => m.KelengkapanPerProdiModule),
      },
    ],
  },
];
