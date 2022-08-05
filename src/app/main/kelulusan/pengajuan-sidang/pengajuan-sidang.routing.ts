import { Routes } from "@angular/router";

import { PengajuanSidangComponent } from "./pengajuan-sidang.component";
import { ManagePengajuanSidangComponent } from "./manage-pengajuan-sidang/manage-pengajuan-sidang.component";

export const PersetujuanPembimbingRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: PengajuanSidangComponent,
      },
      {
        path: "manage-pengajuan-sidang/:id",
        data: { recTitle: "Update Data Pengajuan Sidang" },
        component: ManagePengajuanSidangComponent,
      },
      {
        path: "manage-pengajuan-sidang",
        data: { recTitle: "Tambah Data Pengajuan Sidang" },
        component: ManagePengajuanSidangComponent,
      },
    ],
  },
];
