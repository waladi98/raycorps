import { Routes } from '@angular/router';

import { DetailSK3MahasiswaComponent } from './detail-sk3-mahasiswa.component';

export const DetailSK3MahasiswaRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DetailSK3MahasiswaComponent,
      },
    ],
  },
];
