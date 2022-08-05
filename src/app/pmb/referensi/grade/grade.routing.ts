import { Routes } from "@angular/router";

import { GradeComponent } from "./grade.component";
import { UbahGradeComponent } from "./ubah-grade/ubah-grade.component"

export const GradeRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: GradeComponent,
      },
      {
        path: "ubah-grade/:id",
        component: UbahGradeComponent,
      },
    ],
  },
];
