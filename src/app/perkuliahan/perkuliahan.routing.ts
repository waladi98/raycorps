import { Routes } from "@angular/router";
import { PmbChildGuard } from "../core/auth/guards/pmb-child.guard";
import { SmartGuard } from "../core/auth/guards/smart.guard";
import { PmbHomeGuard } from "../core/auth/guards/pmb-home.guard";
export const PerkuliahanRoutes: Routes = [
  {
    path: "",
    redirectTo: "auth/login",
    pathMatch: "full",
  },
  {
    path: "",
    children: [
      {
        path: "dashboard",
        canActivate: [PmbChildGuard],
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "frame/:modul",
        canActivate: [],
        loadChildren: () =>
          import("../pmb/frame/frame.module").then((m) => m.FrameModule),
      },
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
  {
    path: "auth",
    children: [
      {
        path: "login",
        canActivate: [SmartGuard],
        loadChildren: () =>
          import("./login/login.module").then((m) => m.LoginModule),
      },
    ],
  },
  // {
  //   path: "frame/:modul",
  //   canActivate: [SmartGuard],
  //   loadChildren: () =>
  //     import("./frame/frame.module").then((m) => m.FrameModule),
  // },
];
