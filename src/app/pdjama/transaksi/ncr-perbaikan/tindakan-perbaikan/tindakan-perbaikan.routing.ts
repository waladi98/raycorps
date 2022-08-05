import { Routes } from '@angular/router';

import { TindakanPerbaikanComponent } from './tindakan-perbaikan.component';
export const TindakPerbaikanRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: TindakanPerbaikanComponent
      },
    ]
  }
];
