import { Routes } from '@angular/router';

export const RegistrasiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'pengisian-krs',
        loadChildren: () => import('./pengisian-krs/pengisian-krs.module').then(m => m.PengisianKrsModule)
      },
      {
        path: 'status-perwalian',
        loadChildren: () => import('./status-perwalian/status-perwalian.module').then(m => m.StatusPerwalianModule)
      },
      {
        path: 'drop-out',
        loadChildren: () => import('./drop-out/drop-out.module').then(m => m.DropOutModule)
      },
      {
        path: 'pengajuan-0-sks',
        loadChildren: () => import('./pengajuan-0-sks/pengajuan-0-sks.module').then(m => m.PengajuanSKSModule)
      },
      {
        path: 'rekap-perwalian-per-dosen-wali',
        loadChildren: () => import('./rekap-perwalian-per-dosen-wali/rekap-perwalian-per-dosen-wali.module').then(m => m.RekapPerwalianPerDosenWaliModule)
      },
      {
        path: 'rekap-perwalian-per-mk',
        loadChildren: () => import('./rekap-perwalian-per-mk/rekap-perwalian-per-mk.module').then(m => m.RekapPerwalianPerMKModule)
      },
      {
        path: 'rekap-perwalian-per-prodi',
        loadChildren: () => import('./rekap-perwalian-per-prodi/rekap-perwalian-per-prodi.module').then(m => m.RekapPerwalianPerProdiModule)
      },
      {
        path: 'rekap-perwalian-per-kelas',
        loadChildren: () => import('./rekap-perwalian-per-kelas/rekap-perwalian-per-kelas.module').then(m => m.RekapPerwalianPerKelasModule)
      },
    ]
  }
];
