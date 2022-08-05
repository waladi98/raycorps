import { Routes } from '@angular/router';

import { LLaboratoriumComponent } from './l-laboratorium.component';

export const LLaboratoriumRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LLaboratoriumComponent,
      },
    ],
  },
];
