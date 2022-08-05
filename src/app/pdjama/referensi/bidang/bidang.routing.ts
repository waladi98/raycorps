import { Routes } from "@angular/router";

import { BidangComponent } from "./bidang.component";
import { FormDialogEditComponent } from "./form-dialog-edit/form-dialog-edit.component";

export const BidangRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: BidangComponent,
      },
      {
        path: "edit",
        component: FormDialogEditComponent,
      },
    ],
  },
];
