import { Routes } from '@angular/router';

import { KuesionerComponent } from './kuesioner-mhs.component';

export const KuesionerRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: KuesionerComponent
      },
      {
        path: 'l-administrasi',
        loadChildren: () => import('./l-administrasi/l-administrasi.module').then((m) => m.LAdministrasiModule),
      },
      {
        path: 'l-kemahasiswaan',
        loadChildren: () => import('./l-kemahasiswaan/l-kemahasiswaan.module').then((m) => m.LKemahasiswaanModule),
      },
      {
        path: 'l-laboratorium',
        loadChildren: () => import('./l-laboratorium/l-laboratorium.module').then((m) => m.LLaboratoriumModule),
      },
      {
        path: 'l-akademik-pmb',
        loadChildren: () => import('./l-akademik-pmb/l-akademik-pmb.module').then((m) => m.LAkademikPmbModule),
      },
    ]
  }
];
