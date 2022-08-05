import { Routes } from "@angular/router";

import { UploadBuktiTransferComponent } from "./upload-bukti-transfer.component";

export const UploadBuktiTransferRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: UploadBuktiTransferComponent,
      },
    ],
  },
];
