import { Routes } from '@angular/router';

import { TindakanLanjutComponent } from './tindakan-lanjut.component';
export const TindakLanjutRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: TindakanLanjutComponent
      },
    ]
  }
];
