import { Routes } from "@angular/router";

import { KampusComponent } from "./kampus.component";
import { DetailKomponenNilaiComponent } from "./detail-komponen-nilai/detail-komponen-nilai.component";
import { TambahDataComponent } from "./tambah-data/tambah-data.component";
import { FormDialogEditComponent } from "./form-dialog-edit/form-dialog-edit.component";

export const MemberGetMemberRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: KampusComponent,
      },
      {
        path: "detail-komponen-nilai",
        component: DetailKomponenNilaiComponent,
      },
      {
        path: "tambah-data",
        component: TambahDataComponent,
      },
      {
        path: "edit",
        component: FormDialogEditComponent,
      },
    ],
  },
];
