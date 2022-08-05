import { Routes } from "@angular/router";

import { DispensasiKehadiranDosenComponent } from "./dispensasi-kehadiran-dosen.component";
import { ManageDispensasiKehadiranDosenComponent } from "./manage-dispensasi-kehadiran-dosen/manage-dispensasi-kehadiran-dosen.component";

export const DispensasiKehadiranDosenRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: DispensasiKehadiranDosenComponent,
      },
      {
        path: "manage-dispensasi-kehadiran-dosen/:id",
        data: { recTitle: "Update Data DispensasiKehadiranDosen" },
        component: ManageDispensasiKehadiranDosenComponent,
      },
      {
        path: "manage-dispensasi-kehadiran-dosen",
        data: { recTitle: "Tambah Data DispensasiKehadiranDosen" },
        component: ManageDispensasiKehadiranDosenComponent,
      },
    ],
  },
];
