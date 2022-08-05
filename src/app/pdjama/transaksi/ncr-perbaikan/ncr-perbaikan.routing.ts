import { Routes } from '@angular/router';

import { NCRPerbaikanComponent } from './ncr-perbaikan.component';
import { TindakanPerbaikanModule } from './tindakan-perbaikan/tindakan-perbaikan.module';
export const NCRPerbaikanRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: NCRPerbaikanComponent
      },
      {
        path: 'tindak',
        component: TindakanPerbaikanModule
      },
      {
        path: "test/:kode",
        loadChildren: () =>
          import("./kriteria-penilaian/kriteria-penilaian.module").then(
            (m) => m.KriteriaPenilaianModule
          ),
      },
    ]
  }
];
