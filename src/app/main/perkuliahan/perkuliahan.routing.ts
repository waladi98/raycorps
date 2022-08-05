import { Routes } from '@angular/router';

export const PerkuliahanRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'jadwal-perkuliahan',
        loadChildren: () => import('./jadwal-perkuliahan/jadwal-perkuliahan.module').then((m) => m.JadwalPerkuliahanModule),
      },
      {
        path: 'hari-libur-nasional',
        loadChildren: () => import('./hari-libur-nasional/hari-libur-nasional.module').then((m) => m.HariLiburNasionalModule),
      },
      {
        path: 'dispensasi-kehadiran-dosen',
        loadChildren: () => import('./dispensasi-kehadiran-dosen/dispensasi-kehadiran-dosen.module').then((m) => m.DispensasiKehadiranDosenModule),
      },
      {
        path: 'peserta-kuliah',
        loadChildren: () => import('./peserta-kuliah/peserta-kuliah.module').then((m) => m.PesertaKuliahModule),
      },
      {
        path: 'presensi-perkuliahan',
        loadChildren: () => import('./presensi-perkuliahan/presensi-perkuliahan.module').then((m) => m.PresensiPerkuliahanModule),
      },
      {
        path: 'monitoring-kuliah',
        loadChildren: () => import('./monitoring-kuliah/monitoring-kuliah.module').then((m) => m.MonitoringKuliahModule),
      },
      {
        path: 'laporan-kehadiran-dosen',
        loadChildren: () => import('./laporan-kehadiran-dosen/laporan-kehadiran-dosen.module').then((m) => m.LaporanKehadiranDosenModule),
      },
      {
        path: 'laporan-kehadiran-mahasiswa',
        loadChildren: () => import('./laporan-kehadiran-mahasiswa/laporan-kehadiran-mahasiswa.module').then((m) => m.LaporanKehadiranMahasiswaModule),
      },
      {
        path: 'rekap-kehadiran-mahasiswa',
        loadChildren: () => import('./rekap-kehadiran-mahasiswa/rekap-kehadiran-mahasiswa.module').then((m) => m.RekapKehadiranMahasiswaModule),
      },
      {
        path: 'surat-presensi-mahasiswa',
        loadChildren: () => import('./surat-presensi-mahasiswa/surat-presensi-mahasiswa.module').then((m) => m.SuratPresensiMahasiswaModule),
      },
      {
        path: 'surat-pemberitahuan-kuliah',
        loadChildren: () => import('./surat-pemberitahuan-kuliah/surat-pemberitahuan-kuliah.module').then((m) => m.SuratPemberitahuanKuliahModule),
      },
      {
        path: 'surat-progres-pbm',
        loadChildren: () => import('./surat-progres-pbm/surat-progres-pbm.module').then((m) => m.SuratProgresPbmModule),
      },
      {
        path: 'surat-evaluasi-pbm',
        loadChildren: () => import('./surat-evaluasi-pbm/surat-evaluasi-pbm.module').then((m) => m.SuratEvaluasiPbmModule),
      },
      {
        path: 'jadwal-praktikum-mahasiswa',
        loadChildren: () => import('./jadwal-praktikum-mahasiswa/jadwal-praktikum-mahasiswa.module').then((m) => m.JadwalPraktikumMahasiswaModule),
      },
    ],
  },
];
