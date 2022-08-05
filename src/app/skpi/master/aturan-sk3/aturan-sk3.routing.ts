import { Routes } from '@angular/router';

import { AturanSK3Component } from './aturan-sk3.component';
import { TambahAturanSK3Component } from './tambah-aturan-sk3/tambah-aturan-sk3.component';
import { EditAturanSK3Component } from './edit-aturan-sk3/edit-aturan-sk3.component';

export const VAturanSK3Routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AturanSK3Component,
      },
      {
        path: 'tambah',
        component: TambahAturanSK3Component,
      },
      {
        path: 'edit',
        component: EditAturanSK3Component,
      },
    ],
  },
];
