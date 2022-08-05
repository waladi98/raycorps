import { Routes } from "@angular/router";

import { MonitoringKuliahComponent } from "./monitoring-kuliah.component";
import { ManageMonitoringKuliahComponent } from "./manage-monitoring-kuliah/manage-monitoring-kuliah.component";

export const MonitoringKuliahRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: MonitoringKuliahComponent,
      },
      {
        path: "manage-monitoring-kuliah/:id",
        data: { recTitle: "Update Data MonitoringKuliah" },
        component: ManageMonitoringKuliahComponent,
      },
      {
        path: "manage-monitoring-kuliah",
        data: { recTitle: "Tambah Data MonitoringKuliah" },
        component: ManageMonitoringKuliahComponent,
      },
    ],
  },
];
