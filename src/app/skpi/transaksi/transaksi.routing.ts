import { Routes } from "@angular/router";

export const MasterPMBRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "pengesahan-skpi",
        loadChildren: () =>
          import("./pengesahan-skpi/pengesahan-skpi.module").then((m) => m.PengesahanSKPIModule),
      },
      {
        path: "verifikasi-laporan-mahasiswa",
        loadChildren: () =>
          import("./verifikasi-laporan-mahasiswa/verifikasi-laporan-mahasiswa.module").then((m) => m.VerifikasiLaporanMahasiswaModule),
      },
      {
        path: "verifikasi-kegiatan-sk3",
        loadChildren: () =>
          import("./verifikasi-kegiatan-sk3/verifikasi-kegiatan-sk3.module").then((m) => m.VerifikasiKegiatanSK3Module),
      },  
      {
        path: "no-sk",
        loadChildren: () =>
          import("./no-sk/no-sk.module").then((m) => m.NoSKModule),
      },  
      {
        path: "rekomendasi-usulan-skpi",
        loadChildren: () =>
          import("./rekomendasi-usulan-skpi/rekomendasi-usulan-skpi.module").then((m) => m.RekomendasiUsulanSKPIModule),
      },  
      {
        path: "verifikasi-usulan-skpi",
        loadChildren: () =>
          import("./verifikasi-usulan-skpi/verifikasi-usulan-skpi.module").then((m) => m.VerifikasiUsulanSKPIModule),
      },  
      {
        path: "menu-rekomendasi-usulan-skpi",
        loadChildren: () =>
          import("./rekomendasi-usulan-skpi-menu/rekomendasi-usulan-skpi-menu.module").then((m) => m.RekomendasiUsulanSKPIModule),
      }, 
      {
        path: "menu-verifikasi-usulan-skpi",
        loadChildren: () =>
          import("./verifikasi-usulan-skpi-menu/verifikasi-usulan-skpi-menu.module").then((m) => m.MenuVerifikasiUsulanSKPIModule),
      },   
      {
        path: "aktivitas-sk3",
        loadChildren: () =>
          import("./aktivitas-sk3/aktivitas-sk3.module").then((m) => m.AktivitasSK3Module),
      },  
      {
        path: "usulan-skpi",
        loadChildren: () =>
          import("./usulan-skpi/usulan-skpi.module").then((m) => m.UsulanSKPIModule),
      },  
    ],
  },
];
