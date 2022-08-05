import { Routes } from '@angular/router';

import { KegiatanWajibComponent } from './kegiatan-wajib.component';
import { TambahKegiatanWajibComponent } from './tambah-kegiatan-wajib/tambah-kegiatan-wajib.component';
import { TambahKegiatanWajibProdiComponent } from './tambah-kegiatan-wajib-prodi/tambah-kegiatan-wajib-prodi.component';
import { EditKegiatanWajibComponent } from './edit-kegiatan-wajib/edit-kegiatan-wajib.component';
import { EditKegiatanWajibProdiComponent } from './edit-kegiatan-wajib-prodi/edit-kegiatan-wajib-prodi.component';

export const KegiatanSK3Routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: KegiatanWajibComponent,
      },
      {
        path: 'tambah',
        component: TambahKegiatanWajibComponent,
      },
      {
        path: 'tambah-prodi',
        component: TambahKegiatanWajibProdiComponent,
      },
      {
        path: 'edit',
        component: EditKegiatanWajibComponent,
      },
      {
        path: 'edit-prodi',
        component: EditKegiatanWajibComponent,
      },
    ],
  },
];
