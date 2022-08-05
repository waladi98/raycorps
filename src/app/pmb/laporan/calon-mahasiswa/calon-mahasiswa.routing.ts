import { Routes } from '@angular/router';

import { CalonMahasiswaComponent } from './calon-mahasiswa.component';

export const CalonMahasiswaRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CalonMahasiswaComponent,
      },
    ],
  },
];
