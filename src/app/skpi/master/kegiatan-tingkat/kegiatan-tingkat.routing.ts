import { Routes } from '@angular/router';

import { KegiatanTingkatComponent } from './kegiatan-tingkat.component';
import { TambahKegiatanTingkatComponent } from './tambah-kegiatan-tingkat/tambah-kegiatan-tingkat.component';
import { EditKegiatanTingkatComponent } from './edit-kegiatan-tingkat/edit-kegiatan-tingkat.component';

export const KegiatanTingkatRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: KegiatanTingkatComponent,
      },
      {
        path: 'tambah',
        component: TambahKegiatanTingkatComponent,
      },
      {
        path: 'edit',
        component: EditKegiatanTingkatComponent,
      },
    ],
  },
];
