import { Routes } from "@angular/router";

export const MasterRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "staff-verifikasi",
        loadChildren: () =>
          import("./staff-verifikasi/staff-verifikasi.module").then((m) => m.StaffVerifikasiModule),
      },  
    ],
  },
];
