import { Routes } from '@angular/router';

import { LogSinkronasiComponent } from './log-sinkronasi-pelaporan-simkatmawa.component';

export const LogSinkronasiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LogSinkronasiComponent,
      },
    ],
  },
];
