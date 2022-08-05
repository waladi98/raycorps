import { Routes } from "@angular/router";

export const AkdRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: 'dosen',
        loadChildren: () => import('./dosen/dosen.module').then((m) => m.DosenModule),
      },
      {
        path: 'mhs',
        loadChildren: () => import('./mhs/mhs.module').then((m) => m.MhsModule),
      },
    ],
  },
];
