import { Routes } from '@angular/router';

export const KelulusanRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'kerja-praktek',
        loadChildren: () => import('./kerja-praktek/kerja-praktek.module').then(m => m.KerjaPraktekModule)
      },
      {
        path: 'peserta-kp',
        loadChildren: () => import('./peserta-kp/peserta-kp.module').then(m => m.PesertaKPModule)
      },
      {
        path: 'tugas-akhir',
        loadChildren: () => import('./tugas-akhir/tugas-akhir.module').then(m => m.TugasAkhirModule)
      },
      {
        path: 'peserta-ta',
        loadChildren: () => import('./peserta-ta/peserta-ta.module').then(m => m.PesertaTAModule)
      },
      {
        path: 'sk-yudisium',
        loadChildren: () => import('./sk-yudisium/sk-yudisium.module').then(m => m.SKYudisiumModule)
      },
      {
        path: 'status-tugas-akhir',
        loadChildren: () => import('./status-tugas-akhir/status-tugas-akhir.module').then(m => m.StatusTugasAkhirModule)
      },
      {
        path: 'persetujuan-pembimbing',
        loadChildren: () => import('./persetujuan-pembimbing/persetujuan-pembimbing.module').then(m => m.PersetujuanPembimbingModule)
      },
      {
        path: 'pengajuan-sidang',
        loadChildren: () => import('./pengajuan-sidang/pengajuan-sidang.module').then(m => m.PengajuanSidangModule)
      },
      {
        path: 'pembuatan-ijazah',
        loadChildren: () => import('./pembuatan-ijazah/pembuatan-ijazah.module').then(m => m.PembuatanIjazahModule)
      },
    ]
  }
];
