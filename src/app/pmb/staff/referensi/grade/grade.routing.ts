import { Routes } from "@angular/router";

import { GradeComponent } from "./grade.component";

export const GradeRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: GradeComponent,
      },
    ],
  },
];
