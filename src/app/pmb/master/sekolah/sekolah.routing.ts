import { Routes } from "@angular/router";

import { SekolahComponent } from "./sekolah.component";
import { FormDialogEditComponent } from "./form-dialog-edit/form-dialog-edit.component";

export const SekolahRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: SekolahComponent,
      },
      {
        path: "edit",
        component: FormDialogEditComponent,
      },
    ],
  },
];
