import { Routes } from "@angular/router";

export const LaporanRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "rekap-pmb",
        loadChildren: () =>
          import("./rekapitulasi-pmb/rekapitulasi-pmb.module").then(
            (m) => m.RekapitulasiPMBModule
          ),
      },
      {
        path: "rekap-asal-sekolah",
        loadChildren: () =>
          import("./rekapitulasi-pmb/rekapitulasi-pmb.module").then(
            (m) => m.RekapitulasiPMBModule
          ),
      },
      {
        path: "rekap-asal-pt",
        loadChildren: () =>
          import("./rekapitulasi-pmb/rekapitulasi-pmb.module").then(
            (m) => m.RekapitulasiPMBModule
          ),
      },
      {
        path: "rekap-jas",
        loadChildren: () =>
          import("./rekap-jas/rekap-jas.module").then((m) => m.RekapJasModule),
      },
      {
        path: "rekap-mgm",
        loadChildren: () =>
          import("./member-get-member/member-get-member.module").then(
            (m) => m.MemberGetMemberModule
          ),
      },
    ],
  },
];
