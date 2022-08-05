import { Routes } from "@angular/router";

import { LaporanKehadiranDosenComponent } from "./laporan-kehadiran-dosen.component";
import { ManageLaporanKehadiranDosenComponent } from "./manage-laporan-kehadiran-dosen/manage-laporan-kehadiran-dosen.component";
import { RekapKehadiranPerMkComponent } from "./rekap-table/matakuliah/rekap-kehadiran-per-mk/rekap-kehadiran-per-mk.component";
import { RincianKehadiranPerMkComponent } from "./rekap-table/matakuliah/rincian-kehadiran-per-mk/rincian-kehadiran-per-mk.component";
import { RekapKehadiranDosenComponent } from "./rekap-table/dosen/rekap-kehadiran-dosen/rekap-kehadiran-dosen.component";
import { RincianKehadiranDosenComponent } from "./rekap-table/dosen/rincian-kehadiran-dosen/rincian-kehadiran-dosen.component";

export const LaporanKehadiranDosenRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: LaporanKehadiranDosenComponent,
      },
      {
        path: "manage-laporan-kehadiran-dosen/:id",
        data: { recTitle: "Update Data LaporanKehadiranDosen" },
        component: ManageLaporanKehadiranDosenComponent,
      },
      {
        path: "manage-laporan-kehadiran-dosen",
        data: { recTitle: "Tambah Data LaporanKehadiranDosen" },
        component: ManageLaporanKehadiranDosenComponent,
      },
      {
        path: "rekap-kehadiran-per-mk",
        component: RekapKehadiranPerMkComponent,
      },
      {
        path: "rincian-kehadiran-per-mk",
        component: RincianKehadiranPerMkComponent,
      },
      {
        path: "rekap-kehadiran-dosen",
        component: RekapKehadiranDosenComponent,
      },
      {
        path: "rincian-kehadiran-dosen",
        component: RincianKehadiranDosenComponent,
      },
    ],
  },
];
