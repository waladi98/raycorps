import { Routes } from "@angular/router";

import { AuditorComponent } from "./auditor.component";
import { FormDialogEditComponent } from "./form-dialog-edit/form-dialog-edit.component";

export const AuditorRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: AuditorComponent,
      },
      {
        path: "edit",
        component: FormDialogEditComponent,
      },
    ],
  },
];
