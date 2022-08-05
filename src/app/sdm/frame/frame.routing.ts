import { Routes } from '@angular/router';

import { FrameComponent } from './frame.component';

export const FrameRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: '',
        component: FrameComponent
      }
    ]
  }
];
