import { Routes } from "@angular/router";
import { PmbBayarGuard } from "../../core/auth/guards/pmb-bayar.guard";
import { PmbLulusGuard } from "../../core/auth/guards/pmb-lulus.guard";
import { PmbChildGuard } from "../../core/auth/guards/pmb-child.guard";

export const PendaftarRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "bukti-transfer",
        canActivate: [PmbChildGuard],
        loadChildren: () =>
          import("./upload-bukti-transfer/upload-bukti-transfer.module").then(
            (m) => m.UploadBuktiTransferModule
          ),
      },
      {
        path: "isi-formulir",
        canActivate: [PmbBayarGuard],
        loadChildren: () =>
          import("./isi-formulir-pmb/isi-formulir-pmb.module").then(
            (m) => m.IsiFormulirPmbModule
          ),
      },
      {
        path: "unggah-persyaratan",
        canActivate: [PmbChildGuard],
        loadChildren: () =>
          import("./unggah-persyaratan/unggah-persyaratan.module").then(
            (m) => m.UnggahPersyaratanModule
          ),
      },
      {
        path: "unggah-kelengkapan",
        canActivate: [PmbChildGuard],
        loadChildren: () =>
          import("./unggah-kelengkapan/unggah-kelengkapan.module").then(
            (m) => m.UnggahKelengkapannModule
          ),
      },
      {
        path: "registrasi-ulang",
        canActivate: [],
        loadChildren: () =>
          import("./registrasi-ulang/registrasi-ulang.module").then(
            (m) => m.RegistrasiUlangModule
          ),
      },
    ],
  },
];
